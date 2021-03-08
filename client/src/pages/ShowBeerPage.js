/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { BeerList } from '../components/BeerList'

export const ShowBeerPage = () => {
	const [beers, setBeers] = useState([])
	const {loading, request} = useHttp()
	const {token} = useContext(AuthContext)
	const url = '/beer/showbeer'

	const fetchBeers = useCallback( async (url) => {
		try {
			const fetched = await request(url, 'GET', null, {
				Authorisation: `Bearer ${token}`
			})
			setBeers(fetched)
			console.log(fetched)
		} catch (e) {}
	}, [token, request])

	useEffect( () => { fetchBeers(url) }, [fetchBeers])

	return(
		<>
			<h3>Show _not private_ Beer fields</h3>
			<div className="spacer10">&nbsp;</div>
				
			{!loading && <BeerList beers={beers} />}
		</>
	)
}

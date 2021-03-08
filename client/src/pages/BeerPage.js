/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { BeerList } from '../components/BeerList'

export const BeerPage = () => {
	const [beers, setBeers] = useState([])
	const {loading, request} = useHttp()
	const {token} = useContext(AuthContext)
	const url = '/beer/beer'

	const upHandler = () => {
		let url = '/beer/beerup'
		fetchBeers(url)
	}

	const downHandler = () => {
		let url = '/beer/beerdown'
		fetchBeers(url)
	}

	const resetHandler = () => {
		let url = '/beer/beer'
		fetchBeers(url)
	}

	const fetchBeers = useCallback( async (url) => {
		try {
			const fetched = await request(url, 'GET', null, {
				Authorisation: `Bearer ${token}`
			})
			setBeers(fetched)
		} catch (e) {}
	}, [token, request])

	useEffect( () => { fetchBeers(url) }, [fetchBeers])

	return(
		<>
			<h3>Beer table</h3>
			<div className="spacer10">&nbsp;</div>
			<div>
				<div className="row justify-content-between">
					<div className="col-6">
						<Link to="/addbeer" type="button" className="btn btn-outline-success btn-sm">
							Add new beer
						</Link>
					</div>
					<div className="col-6 text-right">
						<div type="button" className="d-inline-block" onClick={resetHandler}>
						<small><b><u>ABV</u></b></small>
						</div>
						<div className="spacerleft15">&nbsp;</div>
						<div type="button" className="d-inline-block" onClick={upHandler}>
							<small><u>UP</u></small>
						</div>
						<div className="spacerleft15">&nbsp;</div>
						<div type="button" className="d-inline-block" onClick={downHandler}>
							<small><u>DOWN</u></small>
						</div>
					</div>
				</div>
			</div>
			<div className="spacer10">&nbsp;</div>
				
			{!loading && <BeerList beers={beers} />}
		</>
	)
}

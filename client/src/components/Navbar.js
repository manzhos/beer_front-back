import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <div className="container">
            <div className="spacer30">&nbsp;</div>
            <div className="row">
                <div className="col-md-12 text-right">
                    <a href="/"><small>Home</small></a>
                        <div className="spacerleft15">&nbsp;</div>
                        <div className="spacerleft15">&nbsp;</div>
                    <a href="/showbeer"><small>Show private</small></a>
                        <div className="spacerleft15">&nbsp;</div>
                        <div className="spacerleft15">&nbsp;</div>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={logoutHandler}>Logout</button>
                    <hr />
                </div>
            </div>
        </div>
    )
}

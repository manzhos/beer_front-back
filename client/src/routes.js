import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {BeerPage} from './pages/BeerPage'
import {AddBeerPage} from './pages/AddBeerPage'
import {ShowBeerPage} from './pages/ShowBeerPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
         <Route path="/beer" exact>
          <BeerPage />
        </Route>
        <Route path="/addbeer" exact>
          <AddBeerPage />
        </Route>
        <Route path="/showbeer" exact>
          <ShowBeerPage />
        </Route>

        <Redirect to="/beer" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/showbeer" exact>
          <ShowBeerPage />
        </Route>

      <Redirect to="/" />
    </Switch>
  )
}

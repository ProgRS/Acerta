import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home' 
import Form from './pages/Form'
import Header from './components/Header'
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/form/:id" component={Form} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
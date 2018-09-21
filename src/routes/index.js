import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import router from './router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// render the main component
export default () => (
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route exact path='/' component={router} />
      </Provider>
    </Switch>
  </BrowserRouter>
)

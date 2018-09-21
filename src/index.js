import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { router } from './router.js'
import {HashRouter,Route,Switch} from 'react-router-dom'

// render the main component
ReactDOM.render(
  <HashRouter>
  <Switch>
    <Provider store={store}>
      <Route exact path='/' component={router} />
    </Provider>
  </Switch>
</HashRouter>,
  document.getElementById('app')
)

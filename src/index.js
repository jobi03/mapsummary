import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { router } from './router.js'
// import DragDrop from './components/DragnDrop'

// render the main component
ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  // <DragDrop />,
  document.getElementById('app')
)

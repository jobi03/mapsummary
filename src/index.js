import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import registerServiceWorker from './registerServiceWorker'

// render the main component
ReactDOM.render(<Routes />, document.getElementById('app'))
registerServiceWorker()

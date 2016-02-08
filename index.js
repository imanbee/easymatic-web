import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import DevTools from './containers/DevTools'
import configureStore from './store/configureStore'
import './node_modules/react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css'
import './app.css'

const store = configureStore()

    render(
            <Provider store={store}>
            <div>
            <App />
            </div>
            </Provider>,
            document.getElementById('root')
          )

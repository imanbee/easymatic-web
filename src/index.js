import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './containers/App/App'
import configureStore from './store/configureStore'
import './index.css'
import '../node_modules/react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './app.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import {store} from './stores'
//import store from './stores'

import App from './pages/App'
import Users from './pages/Users'
import Questions from './pages/Questions'

import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();
require('antd/dist/antd.css');

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
          <IndexRedirect to="users" />
          <Route path="users" component={ Users } />
          <Route path="questions" component={ Questions } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));

Array.prototype.isArray = true;

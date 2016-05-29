import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerActions, routerMiddleware } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import thunk from 'redux-thunk';

import Auth from './components/Auth'

import reducers from './reducers'

import App from './pages/App'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Main from './pages/Main'


const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
    global.devToolsExtension ? global.devToolsExtension() : f => f
  )
)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="main" component={Auth} >
          <IndexRoute component={Main} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

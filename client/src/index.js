import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';

import Login from './containers/login';
import App from './components/app';
import Ideas from './components/ideas';
import TimedBoard from './components/timed_board';
import Home from './components/home';
import NotFound from './components/not_found';
import reducers from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(reducers, applyMiddleware(thunkMiddleware, promise, routingMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.auth,
  predicate: (auth) => auth.isAuthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false,
});

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/login" component={ Login } />
      <Route path="/" component={ UserIsAuthenticated(App) } >
        <IndexRoute component={ Home } />
        <Route path="/boards/:board_id" component={ Ideas } />
        <Route path="/timed/:timed_board_id" component={ TimedBoard } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>
  </Provider>
  , document.querySelector('.container'));

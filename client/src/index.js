import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';

import Login from './components/login';
import App from './components/app';
import Ideas from './components/ideas';
import Boards from './components/boards';
import reducers from './reducers';

const store = applyMiddleware(thunkMiddleware, promise)(createStore);

render(
  <Provider store={ store(reducers) }>
    <Router history={browserHistory}>
      <Route path="/" component={ Login } />
        <Route path="/home" component={ App }>
        <Route path="/boards" component={ Boards } />
        <Route path="/boards/:board_id" component={ Ideas } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

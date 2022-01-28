import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Router } from 'react-router-dom';
import rootReducer from './reducers';
import Routes from './config/routes';
import { history } from './helpers';

import './index.css';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './components/common/scrollToTop';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop />
      <Routes />
    </Router>
  </Provider>, document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

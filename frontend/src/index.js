import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import index from './reducers/index';
import "typeface-raleway";

const store = createStore(index, applyMiddleware(thunk));




ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter>
    	<App/>
	</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();

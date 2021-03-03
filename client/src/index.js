import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Router Settings:
import { BrowserRouter } from 'react-router-dom';

//Redux Settings:
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import alertReducer from './store/reducers/alertReducer';
import registerReducer from './store/reducers/registerReducer';
import profileReducer from './store/reducers/profileReducer';
import postRedcuer from './store/reducers/postReducer';

// Redux Dev-tool:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  alertReducer: alertReducer,
  registerReducer: registerReducer,
  profileReducer: profileReducer,
  postReducer: postRedcuer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

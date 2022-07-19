
// src/App.js
import React from 'react';
import App from './App';
import Reducer from './/Components/Reducer';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(Reducer);
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
export default App

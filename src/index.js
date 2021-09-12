// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react'

import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';

import App from './App.js'
import  app from './reducers/index'

const store =  createStore(app,applyMiddleware(thunkMiddleware));

let rootElement = document.getElementById('root')

render(
   <Provider store = {store}>
      <App />
   </Provider>,
   
   rootElement
)

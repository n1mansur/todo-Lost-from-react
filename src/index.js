import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import TodoReducer from './redux/Rducer'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = createStore(TodoReducer)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

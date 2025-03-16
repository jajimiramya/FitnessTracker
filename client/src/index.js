
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import "./index.css";

console.log("🔹 React project starting from index.js loaded...");
console.log("✅ React and Redux imported.");
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("✅ Root created.");
root.render(
  <Provider
    store={store}
  >
    <App />
  </Provider>
);
console.log("✅ App component rendered inside Provider.");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
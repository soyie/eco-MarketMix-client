import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {About} from './About'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import Route

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);

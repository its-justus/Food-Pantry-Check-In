import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../Header/Header'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <RegisterPage />
      </div>
    </Router>
  );
}

export default connect()(App);

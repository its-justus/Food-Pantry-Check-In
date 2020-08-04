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
import Dashboard from '../Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <div className="App">
          <Header />
          <RegisterPage />
        </div>
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
    </Router>
  );
}

export default connect()(App);

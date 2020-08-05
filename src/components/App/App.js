import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";
import RegisterPage from "../RegisterPage/RegisterPage";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Header />
          <RegisterPage />
        </Route>
        <Route exact path="/home">
          <Dashboard />
        </Route>
      </div>
    </Router>
  );
}

export default connect()(App);

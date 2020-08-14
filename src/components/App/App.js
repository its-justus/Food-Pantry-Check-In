import React, { Component } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import Dashboard from '../Dashboard/Dashboard';
import CheckIn from '../CheckIn/CheckIn';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_ALL_LOCATIONS' });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from='/' to='/checkin' />
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage />
            </Route>
            {/* For protected routes, the view could show one of several things on the same route.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Create Account' page. */}
            <ProtectedRoute exact path='/checkin' component={CheckIn} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} minimumAccessLevel={10} />
            {/* This works the same as the other protected route, except that if the user is logged in,
              they will see their profile page instead. */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);

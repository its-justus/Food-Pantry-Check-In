import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div></div>
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <Container id="loginContainer" xs={12} sm={12}>
          <Row id="loginRow" xs={12} sm={12}>
            <Card id="loginCard" xs={12} sm={12}>
              <form onSubmit={this.login}>
                <h1 id="login">Login</h1>
                <div id="inputDiv">
                  <div>
                    <label htmlFor="email" className="label">
                      Email:
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="userLoginInput"
                        value={this.state.email}
                        onChange={this.handleInputChangeFor("email")}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="password" className="label">
                      Password:
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="userLoginInput"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor("password")}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <input
                    className="log-in"
                    type="submit"
                    name="submit"
                    value="Log In"
                    id="loginButton"
                  />
                  {this.props.errors.loginMessage && (
                    <h2 className="alert" role="alert">
                      {this.props.errors.loginMessage}
                    </h2>
                  )}
                </div>
              </form>
              <center id="center">
                Don't have an account?{" "}
                <Link to="/register">
                  <button className="changeButton">Register</button>
                </Link>
              </center>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);

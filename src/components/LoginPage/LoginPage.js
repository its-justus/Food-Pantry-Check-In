import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import Toast from "react-bootstrap/Toast";
// import Footer from "../Footer/Footer";
import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    show: false
  };

  handleClose = () => this.setState({ show: false });

  login = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.email,
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
      <div id="loginBody">
        <div id="logoDiv">
          <img src="EFP_Logo_Color.png" alt="EFP Logo" id="efpLogo" />
        </div>
        <Container id="loginContainer">
          <Row id="loginRow">
            <Col lg={true}>
              <Card id="loginCard">
                <form onSubmit={this.login}>
                  <div id="welcomeDiv">
                    <h1 id="login">Login</h1>
                    <AccountCircleIcon />
                  </div>
                  <div id="inputDiv">
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="userLoginInput"
                        value={this.state.email}
                        onChange={this.handleInputChangeFor("email")}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="userLoginInput"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor("password")}
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      className="log-in"
                      type="submit"
                      name="submit"
                      value="Login"
                      id="loginButton"
                    />
                  </div>
                </form>
                {this.props.errors.loginMessage && (<p id="errorP">{this.props.errors.loginMessage}</p>)}
              </Card>
            </Col>
          </Row>
          <Row>
            <center id="center">
              Don't have an account?{" "}
              <Link to="/register">
                <button className="changeButton">Register</button>
              </Link>
            </center>
          </Row>
          <Row>
            <div id="errorDiv">
              {/* {this.props.errors.loginMessage && (
                <Toast style={{ border: "1px solid #b13324" }}> */}
                  {/* <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                      onClick={this.handleClose}
                    />
                    <strong className="mr-auto" style={{ color: "#b13324" }}>
                      !
                    </strong>
                  </Toast.Header> */}
                  {/* <Toast.Body>{this.props.errors.loginMessage}</Toast.Body>
                </Toast>
              )} */}
            </div>
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

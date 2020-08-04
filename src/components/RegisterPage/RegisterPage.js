import React, { Component } from "react";
import { connect } from "react-redux";

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    household_id: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.name && this.state.email && this.state.household_id && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          name: this.state.name,
          email: this.state.email,
          household_id: this.state.household_id,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div>
        </div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1 id="register">Register</h1>
          <div>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleInputChangeFor("name")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="username">
              Email:
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChangeFor("email")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="household_id">
              Household ID:
              <input
                type="text"
                name="household_id"
                placeholder="Household ID"
                value={this.state.household_id}
                onChange={this.handleInputChangeFor("household_id")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          Already have an account?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

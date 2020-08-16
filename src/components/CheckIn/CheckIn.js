import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import "./CheckIn.css";

class CheckIn extends React.Component {
  state = {
    locationID: "",
    dietaryRestrictions: "",
    walkingHome: false,
    pregnant: false,
    childBirthday: false,
    snap: false,
    other: "",
    showCheckIn: true,
    showQuestions: false,
    showSuccess: false,
    showTextArea: false,
    pickup_name: ""
  };

  render() {
    return (
      <>
        <Container id="checkInContainer" fluid>
          <Row className="instructionsRow">
            <div id="titleDiv">
              <h1 id="checkInTitle">Client Check-In</h1>
            </div>
          </Row>
          <Row id="clientInfoRow">
            <div id="clientInfo">
              <h1 id="accountName">Hi {this.props.account.name}!</h1>
              <h3 id="houseId">
                Household ID: <strong>{this.props.account.household_id}</strong>
              </h3>
              <h3 id="lastPickup">
                Last Pickup:{" "}
                <strong>
                  {this.props.account.latest_order
                    ? moment(
                        this.props.account.latest_order.checkout_at
                      ).format("yyyy-MM-DD")
                    : "Never"}
                </strong>
              </h3>
            </div>
          </Row>
          <div>
            <div id="greyLine"></div>
          </div>
          <Row id="checkinBody">
            {this.state.showCheckIn && (
              <div id="clientInput">
                <span id="checkinDirections">
                  <h3 id="instructions">
                    Please fill out this form to pickup your order. Start
                    checking in by selecting your parking spot:
                  </h3>
                </span>
                <form id="spotForm">
                  <br></br>
                  <select
                    name="parking"
                    value={this.state.locationID}
                    id="parkingNumber"
                    onChange={(event) =>
                      this.setState({ locationID: event.target.value })
                    }
                  >
                    <>
                      <option value=""></option>
                      {this.props.parkingLocations.map((location, index) => (
                        <option
                          value={location.id}
                          key={`parking-locations-${index}`}
                        >
                          {location.description}
                        </option>
                      ))}
                    </>
                  </select>
                  <br></br>
                  <input
                    type="button"
                    name="submit"
                    value="Check-In"
                    id="checkInButton"
                    disabled={!Boolean(this.state.locationID)}
                    onClick={() =>
                      this.setState({
                        showQuestions: true,
                        showCheckIn: false,
                      })
                    }
                  />
                </form>
              </div>
            )}
          </Row>
          <Form.Row xs={12}>
            {this.state.showQuestions && (
              <>
                <br />
                <div id="clientQuestions">
                  <p id="lastStep">Last step to finish checking in!</p>
                  <label htmlFor="showTextArea" className="checkboxLabel">
                    Is there another person picking up <br/> the order?
                    <input
                      type="checkbox"
                      className="check"
                      checked={this.state.showTextArea}
                      onChange={() => {
                        this.setState({
                          showTextArea: !this.state.showTextArea,
                        });
                        !this.state.showTextArea &&
                          this.setState({ pickup_name: "" });
                      }}
                    />
                  </label>
                  <br />
                  {this.state.showTextArea && (
                    <>
                      <label htmlFor="pickup_name" id="nameLabel">
                        Please enter the name here:
                        <br />
                        <textarea
                          rows="1"
                          cols="40"
                          name="name"
                          value={this.state.pickup_name}
                          onChange={(event) =>
                            this.setState({
                              pickup_name: event.target.value,
                            })
                          }
                          placeholder="Name of person picking up"
                        ></textarea>
                      </label>
                      <br></br>
                    </>
                  )}
                  <label htmlFor="foodRestrictions" id="foodRestrictionsLabel">
                    Please list any food restrictions here:
                    <br></br>
                    <textarea
                      rows="2"
                      cols="40"
                      name="foodRestrictions"
                      value={this.state.dietaryRestrictions}
                      onChange={(event) =>
                        this.setState({
                          dietaryRestrictions: event.target.value,
                        })
                      }
                      placeholder="Example: Dairy, peanuts"
                    ></textarea>
                  </label>
                  <br></br>
                  <label htmlFor="walking" className="checkboxLabel">
                    Are you walking home?
                    <input
                      type="checkbox"
                      id="walkingHome"
                      className="check"
                      name="walkingHome"
                      checked={this.state.walkingHome}
                      onChange={() =>
                        this.setState({ walkingHome: !this.state.walkingHome })
                      }
                    />
                  </label>
                  <br></br>
                  <label htmlFor="birthday" className="checkboxLabel">
                    Is there a child in the household with a birthday in the
                    next 2 months?
                    <input
                      type="checkbox"
                      id="childBirthday"
                      className="check"
                      name="birthday"
                      checked={this.state.childBirthday}
                      onChange={() =>
                        this.setState({
                          childBirthday: !this.state.childBirthday,
                        })
                      }
                    />
                  </label>
                  <br></br>
                  <label htmlFor="pregnant" className="checkboxLabel">
                    Is there a woman in the household who is pregnant?
                    <input
                      type="checkbox"
                      id="pregnant"
                      className="check"
                      name="pregnant"
                      checked={this.state.pregnant}
                      onChange={() =>
                        this.setState({ pregnant: !this.state.pregnant })
                      }
                    />
                  </label>
                  <br></br>
                  <label htmlFor="snap" className="checkboxLabel">
                    Are you currently receiving SNAP?
                    <input
                      type="checkbox"
                      id="snap"
                      className="check"
                      name="snap"
                      checked={this.state.snap}
                      onChange={() => this.setState({ snap: !this.state.snap })}
                    />
                  </label>
                  <br></br>
                  <label htmlFor="other" className="checkboxLabel">
                    Please list any other needs:
                    <br></br>
                    <textarea
                      rows="2"
                      cols="40"
                      id="other"
                      name="other"
                      placeholder="Example: Baby supplies, hygiene, pet needs"
                      value={this.state.other}
                      onChange={(event) =>
                        this.setState({ other: event.target.value })
                      }
                    />
                  </label>
                  <br></br>
                  <button
                    id="backButton"
                    onClick={() =>
                      this.setState({ showCheckIn: true, showQuestions: false })
                    }
                  >
                    Back
                  </button>
                  <button
                    id="submitButton"
                    onClick={() => {
                      this.props.dispatch({
                        type: "CLEAR_ORDER_PLACEMENT_ERROR",
                      });
                      this.props.dispatch({
                        type: "SUBMIT_ORDER",
                        payload: {
                          location_id: this.state.locationID,
                          dietary_restrictions: this.state.dietaryRestrictions,
                          walking_home: this.state.walkingHome,
                          pregnant: this.state.pregnant,
                          child_birthday: this.state.childBirthday,
                          snap: this.state.snap,
                          pickup_name: this.state.pickup_name,
                          other: this.state.other,
                        },
                      });
                      this.setState({
                        showSuccess: true,
                        showQuestions: false,
                        showTextArea: false,
                      });
                      this.props.dispatch({ type: "FETCH_WAIT_TIME" });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </Form.Row>
          {this.state.showSuccess && (
            <div id="thankYou">
              {this.props.errors.orderMessage ? (
                <h3>{this.props.errors.orderMessage}</h3>
              ) : (
                <>
                  <h3>Thank you, we have received your order!</h3>
                  <p id="waitTime">
                    We will be with you in about:{" "}
                    {`"${
                      this.props.waitTime
                        ? `${this.props.waitTime} minutes.`
                        : "Processing..."
                    }"`}
                  </p>
                  {this.props.waitTime && <p>You may now log out.</p>}
                </>
              )}
            </div>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  parkingLocations: state.parkingLocations,
  errors: state.errors,
  waitTime: state.waitTime
});

export default connect(mapStateToProps)(CheckIn);

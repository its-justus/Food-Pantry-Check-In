import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

//this component is for the dashboard view that is seen by the volunteers
class ManualOrder extends Component {
  state = {
    locationID: '',
    dietaryRestrictions: "",
    walkingHome: false,
    pregnant: false,
    childBirthday: false,
    snap: false,
    other: '',
    waitTime: '',
    houseHoldId: '',
    waitTimeMinutes: '15',
    pickup_name: '',
  };

  render() {
    return (
      <>
        <Container id="checkInContainer">
          <Row id="clientInfoRow">
            <div id="clientInfo">
              <h1 id="accountName">Hi, </h1>
              <h3 id="houseId">
                <label htmlFor="houseHoldId">
                  Enter Household ID:
                  <br></br>
                  <input
                    type="number"
                    name="houseHoldId"
                    value={this.state.houseHoldId}
                    onChange={(event) =>
                      this.setState({ houseHoldId: event.target.value })
                    }
                  />
                </label>
              </h3>
              <h3 id="lastPickup">Last pickup:</h3>
            </div>
          </Row>
          <div id="orangeBox"></div>
          <Row>
            <div id="clientInput">
              <form>
                <label htmlFor="name" id="parkingLabel">
                  Please enter parking spot number:
                  <br></br>
                  <select
                    type="text"
                    name="parking"
                    value={this.state.locationID}
                    id="parkingNumber"
                    onChange={(event) =>
                      this.setState({ locationID: event.target.value })
                    }
                  >
                    <>
                      {this.props.parkingLocations.map((location, index) =>
                        <option
                          value={location.id}
                          key={`parking-locations-${index}`}
                        >{location.description}</option>
                      )}
                    </>
                  </select>
                  <br></br>
                </label>
              </form>
            </div>
          </Row>
          <Form.Row xs={12}>
            <>
              <div id="clientQuestions">
                <label htmlFor="pickup_name" id="nameLabel">
                  Please enter the name here:
                  <br></br>
                  <textarea
                    rows="2"
                    cols="40"
                    name="name"
                    value={this.state.pickup_name}
                    onChange={(event) =>
                      this.setState({
                        pickup_name: event.target.value,
                      })
                    }
                    placeholder="Enter name of person picking up"
                  ></textarea>
                </label>
                <br></br>
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
                  Is there a child in the household with a birthday in the next
                  2 months?
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
                <br />
                <label for="waitTime">
                  Please choose a wait time:
                  <select
                    name="waitTime"
                    id="times"
                    value={this.state.waitTimeMinutes}
                    onChange={(event) =>
                      this.setState({
                        waitTimeMinutes: event.target.value,
                      })
                    }
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </label>
                <br></br>
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
                        wait_time_minutes: this.state.waitTimeMinutes,
                      },
                    });
                  }}
                >
                  Submit
                </button>
              </div>
            </>
          </Form.Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeOrders: state.activeOrders,
  completeOrders: state.completeOrders,
  parkingLocations: state.parkingLocations
});

export default connect(mapStateToProps)(ManualOrder);

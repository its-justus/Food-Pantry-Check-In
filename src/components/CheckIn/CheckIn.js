import React from 'react';
import { connect } from 'react-redux';

class CheckIn extends React.Component {
  state = {
    parking: 0,
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <>
        <div id="clientInfo">
          <h1>{this.props.account.name}</h1>
          <h2>{this.props.account.household_id}</h2>
          <h3>This will be the last check-in date</h3>
        </div>
        <div id="clientInput">
          <form onSubmit={this.checkIn}>
            {" "}
            {/* TODO: write dispatch / saga for checking in */}
            <label htmlFor="name">
              Please enter parking spot number:
              <input
                type="text"
                name="parking"
                value={this.state.parking}
                id="parkingNumber"
                onChange={event => this.setState({ parking: event.target.value })}
              ></input>
              <input
                type="submit"
                name="submit"
                value="Check-In"
                id="checkInButton"
              ></input>
            </label>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account
});

export default connect(mapStateToProps)(CheckIn);

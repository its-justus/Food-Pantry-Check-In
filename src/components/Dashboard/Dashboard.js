import React, { Component } from "react";
import {connect} from "react-redux";

//this component is for the dashboard view that is seen by the volunteers
class Dashboard extends Component {

	componentDidMount = () => {
		this.props.dispatch({type: "FETCH_ACTIVE_ORDERS"});
		setInterval(() => this.props.dispatch({type: "FETCH_ACTIVE_ORDERS"}), 10*1000);
		this.props.dispatch({type: "FETCH_COMPLETE_ORDERS"});
		setInterval(() => this.props.dispatch({type: "FETCH_COMPLETE_ORDERS"}), 10*1000);
	}
  

  render() {
    return (
      <>
        <div className="dashBoard row">
          <div className="span6">
            <form>
              <ul>
                {this.props.activeOrders?.map((cur, i) => (
                  <li>{cur.account_id}</li>
                ))}
              </ul>
              <br />
              <button className="btn btn-large btn-primary" type="submit">
                Add Client
              </button>
            </form>
          </div>
          <div className="span6">
            <form>
              <header className="header">
                <h3>{this.props.activeOrders.name}</h3>
                <h4>ID: {this.props.activeOrders.account_id}</h4>
              </header>
              <body id="dashBody">
                <span>
                  <b>Food Restrictions</b>
                </span>
                <span>
                  {this.props.activeOrders.name} snobby eats everything. He's
                  like a marauding Komodo dragon when it comes to food. Give him
                  everything, he can handle it all.
                </span>
                <br />
                <span>
                  Walking home: {this.props.activeOrders.walking_home}
                </span>
                <br />
                <span>
                  Child Birthday coming up:
                  {this.props.activeOrders.child_birthday}
                </span>
                <br />
                <span>
                  Someone at home is pregnant:
                  {this.props.activeOrders.pregnant}
                </span>
                <br />
                <button className="btn btn-large btn-primary" type="submit">
                  Check in
                </button>
                <button className="btn btn-large btn-primary" type="submit">
                  Eligible
                </button>
              </body>
            </form>
          </div>
          <div className="span6">
            <form>
              <ul>
                {this.props.completeOrders?.map((complete, i) => (
                  <li>{complete.account_id}</li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeOrders: state.activeOrders,
  completeOrders: state.completeOrders,
});

export default connect(mapStateToProps)(Dashboard);

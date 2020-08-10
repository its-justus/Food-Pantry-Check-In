import React, { Component } from "react";
import {connect} from "react-redux";

//this component is for the dashboard view that is seen by the volunteers
class Dashboard extends Component {
  state = {
    orderObj: {}
  }

	componentDidMount = () => {
		this.props.dispatch({type: "FETCH_ACTIVE_ORDERS"});
		setInterval(() => this.props.dispatch({type: "FETCH_ACTIVE_ORDERS"}), 10*1000);
		this.props.dispatch({type: "FETCH_COMPLETE_ORDERS"});
		setInterval(() => this.props.dispatch({type: "FETCH_COMPLETE_ORDERS"}), 10*1000);
	}
  
  setLocalStateObj = (order) => {
    this.setState({ orderObj: order })
  }

  render() {
    return (
      <>
        <div className="dashBoard row">
          <div className="span6">
            <form>
              <ul>
                {this.props.activeOrders?.map((cur, i) => (
                  <li>
                    <button
                      onClick={() => this.setLocalStateObj(cur)}
                    >{cur.name}
                    </button>
                  </li>
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
                  {this.state.orderObj.name}
                </span>
                <br />
                <span>
                  Walking home: {this.state.orderObj.walking_home}
                </span>
                <br />
                <span>
                  Child Birthday coming up:
                  {this.state.orderObj.child_birthday}
                </span>
                <br />
                <span>
                  Someone at home is pregnant:
                  {this.state.orderObj.pregnant}
                </span>
                <br />
                <span>
                  Dietary restrictions:
                  {this.state.orderObj.dietary_restrictions}
                </span>
                <br />
                <button
                  disabled={this.state.orderObj.checkout_at}
                  className="btn btn-large btn-primary"
                  onClick={() => this.props.dispatch({ type: 'ORDER_CHECKOUT', payload: this.state.orderObj.id })}
                >
                  Check In
                </button>
                <div>Eligible</div>
              </body>
            </form>
          </div>
          <div className="span6">
            <form>
              <ul>
                {this.props.completeOrders?.map((complete) => (
                  <li>
                    <button
                      onClick={() => this.setLocalStateObj(complete)}
                      >{complete.name}</button>
                  </li>
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

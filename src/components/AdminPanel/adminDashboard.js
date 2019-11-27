import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./adminDashboard.css";
import { connect } from "react-redux";
import { getUsers, getWorkshops } from "../../actions/adminActions";
import PropTypes from "prop-types";

var divStyle = {
  marginTop: 50
};

class adminDashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getWorkshops();
  }
  render() {
    let pendingWorkshops = 0;
    let acceptedWorkshops = 0;
    const { users, workshops } = this.props.adminPanel;
    for (let i = 0; i < workshops.length; i++) {
      if (workshops[i].accepted === false) pendingWorkshops++;
      else if (workshops[i].accepted === true) acceptedWorkshops++;
    }
    return (
      <div className="container" style={divStyle}>
        <div className="row">
          <div className="col-md-4 col-xl-3">
            <Link to={`/admin/userList`}>
              <div className="card bg-c-blue order-card">
                <div className="card-block">
                  <h5 className="m-b-20">Users management</h5>
                  <h3 className="text-right">
                    <i className="fa fa-users f-left"></i>
                    <span>{users.length}</span>
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
              <div className="card-block">
                <h5 className="m-b-20">Workshop manage</h5>
                <h2 className="text-right">
                  <i className="fa fa-warehouse f-left"></i>
                  <span>{workshops.length}</span>
                </h2>
                <br></br>
                <Link to="/admin/pendingWorkshopList" style={{ color: "#FFF" }}>
                  <p className="m-b-0">
                    Pending workshops
                    <span className="f-right">{pendingWorkshops}</span>
                  </p>
                </Link>
                <Link
                  to="/admin/acceptedWorkshopList"
                  style={{ color: "#FFF" }}
                >
                  <p className="m-b-0">
                    Accepted workhops
                    <span className="f-right">{acceptedWorkshops}</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
              <div className="card-block">
                <h5 className="m-b-20">Issues management</h5>
                <h2 className="text-right">
                  <i className="fa fa-rocket f-left"></i>
                  <span>486</span>
                </h2>
                <br></br>
                <p className="m-b-0">
                  Pending workshops<span className="f-right">351</span>
                </p>
                <p className="m-b-0">
                  Accepted workhops<span className="f-right">351</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-xl-3">
            <div className="card bg-c-pink order-card">
              <div className="card-block">
                <h6 className="m-b-20">Orders Received</h6>
                <h2 className="text-right">
                  <i className="fa fa-credit-card f-left"></i>
                  <span>486</span>
                </h2>
                <p className="m-b-0">
                  Completed Orders<span className="f-right">351</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

adminDashboard.propTypes = {
  adminPanel: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getWorkshops: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adminPanel: state.adminPanel
});

export default connect(
  mapStateToProps,
  { getUsers, getWorkshops }
)(adminDashboard);

import React, { Component } from "react";
import UserItem from "./UserItem";
import { connect } from "react-redux";
import { getUsers } from "../../../actions/adminActions";
import PropTypes from "prop-types";
import "./UserList.css";
import { Link } from "react-router-dom";

class UserList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.adminPanel;
    return (
      <div className="container">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th>
                        <span>User</span>
                      </th>
                      <th>
                        <span>Created</span>
                      </th>
                      <th>
                        <span>Updated</span>
                      </th>
                      <th className="text-center">
                        <span>Issues</span>
                      </th>
                      <th className="text-center">
                        <span>Shops</span>
                      </th>
                      <th>
                        <span>Username/Email</span>
                      </th>
                      <th>
                        <span>Options</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="pagination pull-right">
                <li>
                  <Link to="#">
                    <i className="fa fa-chevron-left"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#">2</Link>
                </li>
                <li>
                  <Link to="#">3</Link>
                </li>
                <li>
                  <Link to="#">4</Link>
                </li>
                <li>
                  <Link to="#">5</Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  adminPanel: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adminPanel: state.adminPanel
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);

import React, { Component } from "react";
import { deleteUser } from "../../../actions/adminActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserItem extends Component {
  onDeleteClick = id => {
    this.props.deleteUser(id);
  };

  render() {
    const { user } = this.props;

    let roleCheck;

    if (user.roles.some(e => e.name === "ADMIN")) {
      roleCheck = "ADMIN";
    } else if (user.roles.some(e => e.name === "WORKSHOPOWNER")) {
      roleCheck = "WORKSHOP OWNER";
    } else if (user.roles.some(e => e.name === "USER")) {
      roleCheck = "USER";
    }

    return (
      <tr>
        <td>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
          />
          <Link to={`userProfile/${user.id}`} className="user-link">
            {user.fullName}
          </Link>
          <span className="user-subhead">{roleCheck}</span>
        </td>
        <td>{user.create_At}</td>
        <td>{user.update_At}</td>
        <td className="text-center">
          <span className="label label-default">{user.issues.length}</span>
        </td>
        <td className="text-center">
          <span className="label label-default">{user.workshops.length}</span>
        </td>
        <td>
          <Link to="">{user.username}</Link>
        </td>
        <td style={{ width: "10%" }}>
          <Link to={`editUser/${user.id}`} className="table-link">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x"></i>
              <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
            </span>
          </Link>
          <Link to="userList" className="table-link danger">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x"></i>
              <i
                className="fa fa-trash-o fa-stack-1x fa-inverse"
                onClick={this.onDeleteClick.bind(this, user.id)}
              ></i>
            </span>
          </Link>
        </td>
      </tr>
    );
  }
}

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteUser }
)(UserItem);

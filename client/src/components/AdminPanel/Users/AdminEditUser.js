import React, { Component } from "react";
import {
  findUser,
  adminEditUser,
  addAdmin
} from "../../../actions/adminActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class AdminEditUser extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      create_at: "",
      errors: {},
      roles: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onAddAdminClick = id => {
    this.props.addAdmin(id, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, username, fullName, roles } = nextProps.user;

    this.setState({
      id,
      username,
      fullName,
      roles
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.findUser(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const AdminEditUser = {
      id: this.state.id,
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password
    };

    this.props.adminEditUser(AdminEditUser, this.props.history);
  }
  render() {
    const { errors } = this.state;

    let adminButton;
    const isAdmin = <div></div>;
    const notAdmin = (
      <Link
        className="btn btn-primary mb-3 float-right"
        onClick={this.onAddAdminClick.bind(this, this.state.id)}
      >
        <i className="fas fa-plus-circle"> Upgrade to ADMIN</i>
      </Link>
    );

    if (this.state.roles.some(e => e.name === "ADMIN")) {
      adminButton = isAdmin;
    } else {
      adminButton = notAdmin;
    }

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit User form</h5>
              <p className="lead text-center">
                <b>Username: </b>
                {this.state.username} | <b>User ID: </b> {this.state.id}
              </p>
              <Link to="/admin/userList" className="float-left">
                Back
              </Link>
              {adminButton}
              <br></br>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.id
                    })}
                    placeholder="id"
                    name="id"
                    value={this.state.id}
                    onChange={this.onChange}
                    disabled
                  />
                  {errors.id && (
                    <div className="invalid-feedback">{errors.id}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Unique username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName
                    })}
                    placeholder="fullName"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminEditUser.propTypes = {
  findUser: PropTypes.func.isRequired,
  adminEditUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addAdmin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.adminPanel.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { findUser, adminEditUser, addAdmin }
)(AdminEditUser);

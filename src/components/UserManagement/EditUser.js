import React, { Component } from "react";
import { getUser, editUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class EditUser extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      create_at: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, username, fullName, create_at } = nextProps.actualUser;

    this.setState({
      id,
      username,
      fullName,
      create_at
    });
  }

  componentDidMount() {
    this.props.getUser();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const EditUser = {
      id: this.state.id,
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      create_at: this.state.create_at
    };

    console.log(this.props.security.user.fullName);
    console.log(this.props.security.user.roles);
    this.props.editUser(EditUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit User form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <span>Username</span>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    disabled
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <span>Full name</span>
                  <input
                    type="text"
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
                  <span>Password</span>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <span>Confirm password</span>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
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

EditUser.propTypes = {
  security: PropTypes.object.isRequired,
  actualUser: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  actualUser: state.actualUser.user,
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser, editUser }
)(EditUser);

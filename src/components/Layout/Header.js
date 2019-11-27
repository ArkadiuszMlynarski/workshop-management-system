import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/editUser">
              <i className="fas fa-user-circle mr-1" /> {user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="" onClick={this.logout.bind(this)}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsAuthenticatedAndAdmin = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/editUser">
              <i className="fas fa-user-circle mr-1" /> {user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/">
              Admin Panel
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="" onClick={this.logout.bind(this)}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsAuthenticatedAndOwner = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="far fa-list-alt"></i> Your Issues
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/workshop/dashboard">
              <i className="fas fa-warehouse"></i> Workshop Management
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/editUser">
              <i className="fas fa-user-circle mr-1" /> {user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="" onClick={this.logout.bind(this)}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              <i className="fas.fa-user-circle-mr-1" />
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;

      //Refresh, po expirationTime wyrzuca uzytkownika
      setTimeout(function() {
        window.location.reload();
      }, (user.exp - Date.now() / 1000) * 1000);

      if (user.roles.some(e => e.authority === "ROLE_ADMIN")) {
        headerLinks = userIsAuthenticatedAndAdmin;
      } else if (user.roles.some(e => e.authority === "ROLE_WORKSHOPOWNER")) {
        headerLinks = userIsAuthenticatedAndOwner;
      }
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    // if (user.roles.some(e => e.authority === "ROLE_ADMIN")) {
    //   console.log("Admin");
    // } else {
    //   console.log("Nie admin");
    // }

    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark mb-4"
        style={{
          backgroundColor: "#272e38",
          borderBottom: "3px solid #e74c3c"
        }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-wrench"></i> Cars Mechanic
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);

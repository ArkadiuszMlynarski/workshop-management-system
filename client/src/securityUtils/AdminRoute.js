import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      security.validToken === true &&
      security.user.roles.some(e => e.authority === "ROLE_ADMIN") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

AdminRoute.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(AdminRoute);

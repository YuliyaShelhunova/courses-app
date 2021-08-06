import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRouter = ({ component, isAdmin, isAuth, ...rest }) => {
  let ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={(props) => (
        <div>
          {!isAuth ? (
            <Redirect to="/login" />
          ) : isAdmin ? (
            <ComponentToRender {...props} />
          ) : (
            <Redirect to="/courses" />
          )}
        </div>
      )}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  isAdmin: state.user.isAdmin,
  isAuth: state.user.isAuth,
});
export default withRouter(connect(mapStateToProps)(PrivateRouter));

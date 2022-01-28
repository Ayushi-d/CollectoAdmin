import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLogin } from '../helpers';
import { URLS } from '../constants';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdminLogin() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: URLS.AdminLogin,
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

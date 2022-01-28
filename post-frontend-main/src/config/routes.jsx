import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdminLogin from '../container/login';
import Dashboard from '../container/dashboard';
import User from '../container/user';
import UserDetail from '../container/userDetail';
import Settings from '../container/account/settings';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { routeConstants, URLS } from '../constants';

function Routes() {
  return (
    <Switch>
      {/* Public route starts */}
      <PublicRoute exec path={routeConstants.LOGIN_URL} component={AdminLogin} />
      {/* Public route end */}

      {/* private route start */}
      <Route
        exact
        path={`${routeConstants.HOME_URL}`}
        render={() => <Redirect to={`${URLS.AdminLogin}`} />}
      />
      <PrivateRoute path={routeConstants.DASHBOARD_URL} component={Dashboard} />
      <PrivateRoute path={routeConstants.SHOW_ALL_USER_URL} component={User} />
      <PrivateRoute
        path={`${routeConstants.SHOW_USER_DETAIL_URL}${':userId'}`}
        component={UserDetail}
      />
      <PrivateRoute
        path={routeConstants.SHOW_ADMIN_SETTINGS_URL}
        component={Settings}
      />
      {/* private route end */}
    </Switch>
  );
}
export default Routes;

import {
  Messages,
  userConstants,
} from '../constants';
import { userServices } from '../services';
import {
  setToken, history, notificationType, openNotificationWithIcon, setRefreshToken, commonLogout,
} from '../helpers';

function authenticate(userData) {
  function request(data) { return { type: userConstants.USER_GET_AUTHENTICATE_REQUEST, data }; }
  function success(user) { return { type: userConstants.USER_GET_AUTHENTICATE_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.USER_GET_AUTHENTICATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ userData }));
    userServices.authenticate(userData)
      .then(
        (res) => {
          if (res.success) {
            const { data } = res;
            const { token } = data;
            const { refreshToken } = data;
            setToken(token);
            setRefreshToken(refreshToken);
            dispatch(success(data));
            history.push('/admin/dashboard');
            return openNotificationWithIcon(notificationType.SUCCESS, res.message);
          } else if (!res.success) {
            const msg = res.message ? res.message : Messages.failure;
            dispatch(failure(msg.toString()));
            openNotificationWithIcon(notificationType.WARNING, msg.toString());
          }
        },
        (error) => {
          dispatch(failure(error.toString()));
          openNotificationWithIcon(notificationType.ERROR, error.toString());
        },
      );
  };
}


function getAllUsers(data, endpoint = '') {
  function request(data) { return { type: userConstants.GET_ALL_USERS_REQUEST, data }; }
  function success(users) { return { type: userConstants.GET_ALL_USERS_SUCCESS, users }; }
  function failure(error) { return { type: userConstants.GET_ALL_USERS_FAILURE, error }; }

  return async (dispatch) => {
    dispatch(request());
    await userServices.getAllUsers(data, endpoint)
      .then(
        (res) => {
          if (res && res.data.success) {
            dispatch(success(res.data.data));
            if (res.data.message) {
              openNotificationWithIcon(notificationType.SUCCESS, res.message);
            }
          } else {
            const msg = res.data.message ? res.data.message : Messages.failure;
            dispatch(failure(msg.toString()));
            openNotificationWithIcon(notificationType.WARNING, msg.toString());
          }
        },
        (error) => {
          dispatch(failure(error.toString()));
          openNotificationWithIcon(notificationType.ERROR, error.toString());
        },
      ).catch((err) => {
        dispatch(failure(err.toString()));
        openNotificationWithIcon(notificationType.ERROR, err.toString());
      });
  };
}

function enableDisableUser(data) {
  function request(token) { return { type: userConstants.USER_ENABLE_DISABLE_REQUEST, token }; }
  function success(user) { return { type: userConstants.USER_ENABLE_DISABLE_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.USER_ENABLE_DISABLE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());
    userServices.enableDisableUser(data)
      .then(
        (res) => {
          if (res.success) {
            dispatch(success(res.data));
            if (res.message) {
              openNotificationWithIcon(notificationType.SUCCESS, res.message);
            }
          } else {
            const msg = res.message ? res.message : Messages.failure;
            dispatch(failure(msg.toString()));
            openNotificationWithIcon(notificationType.WARNING, msg.toString());
          }
        },
        (error) => {
          dispatch(failure(error.toString()));
          openNotificationWithIcon(notificationType.ERROR, error.toString());
        },
      );
  };
}

function logout() {
  userServices.logout();
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  authenticate,
  logout,
  getAllUsers,
  enableDisableUser,
};

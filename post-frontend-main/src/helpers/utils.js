/* eslint-disable consistent-return */
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import { storageHelper } from './storageHelper';
import { history } from './history';
import {
  WRONG_ADMIN_CREDENTIALS,
  WRONG_CLIENT_CREDENTIALS,
} from '../constants/notification.constants';
import { RoleCheck } from '../constants';
import { userActions } from '../action';

export const AccessToken = 'AccessToken';
export const ClientToken = 'ClientToken';
export const RefreshToken = 'RefreshToken';

export const notificationType = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

export const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export const removeToken = () => {
  storageHelper.deleteData(AccessToken);
};

export const setToken = (token) => {
  storageHelper.setData(AccessToken, JSON.stringify(token));
};

export const getToken = () => {
  const token = storageHelper.getData(AccessToken);
  return JSON.parse(token);
};

export const setRefreshToken = (token) => {
  storageHelper.setData(RefreshToken, JSON.stringify(token));
};

export const getRefreshToken = async () => {
  const refreshToken = await storageHelper.getData(RefreshToken);
  return JSON.parse(refreshToken);
};

export const removeClientToken = () => {
  storageHelper.deleteData(ClientToken);
};

export const setClientToken = (token) => {
  storageHelper.setData(ClientToken, JSON.stringify(token));
};

export const getClientToken = () => {
  const token = storageHelper.getData(ClientToken);
  return JSON.parse(token);
};

export const isAdminLogin = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  const tokenData = jwtDecode(token);
  if (token && tokenData.role[0].name === RoleCheck.SUPER_ADMIN) {
    return true;
  }
  storageHelper.deleteData(AccessToken);
  storageHelper.deleteData(RefreshToken);
  openNotificationWithIcon(notificationType.ERROR, WRONG_ADMIN_CREDENTIALS);
  return false;
};

export const isClientLogin = () => {
  const token = getClientToken();
  if (!token) {
    return false;
  }
  const tokenData = jwtDecode(token);
  if (token && tokenData.role === RoleCheck.APP_USER) {
    return true;
  }
  storageHelper.deleteData(ClientToken);
  storageHelper.deleteData(RefreshToken);
  openNotificationWithIcon(notificationType.ERROR, WRONG_CLIENT_CREDENTIALS);
  return false;
};

export const commonLogout = () => {
  storageHelper.deleteData(AccessToken);
  storageHelper.deleteData(RefreshToken);
  openNotificationWithIcon(notificationType.SUCCESS, 'Logout successfully');
  history.push('/admin');
};

export const clientLogout = () => {
  // remove user from local storage to log user out
  storageHelper.deleteData(ClientToken);
  storageHelper.deleteData(RefreshToken);
  openNotificationWithIcon(notificationType.SUCCESS, 'Logout successfully');
  history.push('/');
};

export const isVerified = async () => {
  const token = await getClientToken();
  const tokenData = jwtDecode(token);
  return tokenData.emailVerified;
};

export const verifyCommonToken = (token) => {
  const tokenData = jwtDecode(token);
  return tokenData;
};

export function validateToken(token, tokenRefresh = true) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
    const currentTime = new Date().getTime() / 1000;
    if (currentTime > decodedToken.exp) {
      if (tokenRefresh) {
        const res = getRefreshToken();
        if (res !== undefined && res.token) {
          const newToken = res.token;
          if (decodedToken === RoleCheck.APP_USER) {
            removeClientToken();
            setClientToken(newToken);
          } else if (decodedToken === RoleCheck.SUPER_ADMIN) {
            removeToken();
            setToken(newToken);
          }
          return resolve(newToken);
        }
        if (decodedToken === RoleCheck.APP_USER) {
          await clientLogout();
        } else if (decodedToken === RoleCheck.SUPER_ADMIN) {
          await commonLogout();
        }
      } else if (decodedToken === RoleCheck.APP_USER) {
        await clientLogout();
      } else if (decodedToken === RoleCheck.SUPER_ADMIN) {
        await commonLogout();
      }
    } else {
      return resolve(token);
    }
  });
}

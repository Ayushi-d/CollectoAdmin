/* eslint-disable no-param-reassign */
import axios from 'axios';
import { commonLogout, getToken, validateToken } from '../helpers';
import { APP_URL, ACTION_END_POINTS, CLIENT_END_POINTS } from '../constants';

function logout() {
  commonLogout();
}

function handleResponse(response) {
  if (response.status === 500) {
    return false;
  }
  if (response.status === 401) {
    logout();
    return false;
  }
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return data;
      }
    }
    return data;
  });
}

function authenticate(user) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  return fetch(`${APP_URL}${ACTION_END_POINTS.Login}`, requestOptions)
    .then(handleResponse)
    .then((rawValue) => rawValue);
}

async function getAllUsers(token, endpoint = '') {
  await validateToken(token).then((res) => {
    token = res;
  });
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: `${APP_URL}${endpoint ? endpoint : ACTION_END_POINTS.GetAllUsers}`,
  });
}

async function enableDisableUser(data) {
  let token = await getToken();
  validateToken(token).then((res) => {
    token = res;
  });
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
  };
  return fetch(
    `${APP_URL}${ACTION_END_POINTS.UserEnableDisable}`,
    requestOptions,
  )
    .then(handleResponse)
    .then((rawVal) => rawVal);
}

async function getUserProfile(token) {
  validateToken(token).then((res) => {
    token = res;
  });
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: `${APP_URL}${CLIENT_END_POINTS.UserProfile}`,
  });
}

async function deleteUpload(id, token) {
  validateToken(token).then((res) => {
    token = res;
  });
  return axios({
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id
    },
    url: `${APP_URL}${ACTION_END_POINTS.deletePost}`,
  });
}

export const userServices = {
  authenticate,
  logout,
  getAllUsers,
  enableDisableUser,
  getUserProfile,
  deleteUpload
};

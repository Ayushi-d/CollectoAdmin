import { userConstants } from '../constants';
import { storageHelper } from '../helpers/storageHelper';
import { AccessToken } from '../helpers';

const user = JSON.parse(storageHelper.getData('user'));
const accessToken = JSON.parse(storageHelper.getData(AccessToken));
const initialState = {
  loading: false,
  loggedIn: user !== null,
  user: {
    id: user !== null ? user.id : '',
    username: user !== null ? user.username : '',
    name: user !== null ? user.name : '',
    email: user !== null ? user.email : '',
    userRole: 'ROLE_ADMIN',
    city: user !== null ? user.city : '',
    state: user !== null ? user.state : '',
    enabled: user !== null ? user.enabled : '',
    referralCode: user !== null ? user.referralCode : '',
  },
  token: accessToken !== null ? accessToken : '',
  errorMessage: '',
  allUsers: [],
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_GET_AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.USER_GET_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: {
          id: action.user.id,
          username: action.user.username,
          name: action.user.name,
          email: action.user.email,
          city: action.user.city,
          state: action.user.state,
          enabled: action.user.enabled,
          referralCode: action.user.referralCode,
        },
        token: action.user.token,
      };
    case userConstants.USER_GET_AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case userConstants.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsers: action.users,
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case userConstants.USER_ENABLE_DISABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.USER_ENABLE_DISABLE_SUCCESS: {
      const rawItem = state.allUsers.filter((item) => {
        if (item.id === action.user.id) {
          // eslint-disable-next-line no-param-reassign
          item.enabled = action.user.enabled;
          return { item };
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        allUsers: rawItem,
      };
    }
    case userConstants.USER_ENABLE_DISABLE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case userConstants.LOGOUT:
      return {
        ...initialState,
        loggedIn: false,
      };
    default:
      return state;
  }
}

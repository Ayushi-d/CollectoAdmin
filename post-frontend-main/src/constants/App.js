export const APP_URL = 'http://3.138.124.101:9500';

export const URLS = {
  Home: '/admin',
  AdminLogin: '/admin/login',
  Dashboard: '/admin/dashboard',
  UserHome: '/',
  UserLogin: '/login',
};

export const ACTION_END_POINTS = {
  Login: '/api/v1/auth/login',
  GetAllUsers: '/api/v1/user/my-profile',
  GetNewUsers: '/api/v1/user/newly-added-users',
  UserEnableDisable: '/api/v1/user/enable-user',
  GetAllSlots: '/api/v1/slot/all',
  createSlots: '/api/v1/slot/create',
  GetAllServices: '/api/v1/service/all',
  createNewService: '/api/v1/service/create',
  createRequest: '/api/v1/slot/request-slots',
  GetAllRequests: '/api/v1/slot/request',
  deleteSlotRequest: '/api/v1/slot/request-delete',
  deletePost: '/api/v1/user/delete-post',
  assignSlot: '/api/v1/slot/assign',
  checkout: '/api/v1/payment/start',
};

export const CLIENT_END_POINTS = {
  ClientLogin: '/api/v1/auth/login',
  CLientRegister: '/api/v1/auth/register',
  ClientLogout: '/api/v1/auth/logout',
  ClientForgotPassword: '/api/v1/auth/forgot-password',
  ClientChangePassword: '/api/v1/user/change-password',
  RefreshToken: '/api/v1/auth/refresh-token',
  ClientUpdateProfile: '/api/v1/user/update-profile',
  ClientVerifyOtp: '/api/v1/auth/verify-otp',
  SubscriptionAll: '/api/v1/subscription/all',
  CancelSubscription: '/api/v1/subscription/cancel',
  DeleteSubscription: '/api/v1/subscription/delete',
  UpdatePayment: '/api/v1/payment/update',
  UserProfile: '/api/v1/user/user-profile',
};

export const AppName = 'Admin';
export const AppContent = {
  Footer_Section: {
    copy_right_text: '© 2021 All Right Reserved',
  },
};

export const Messages = {
  failure: 'Something went wrong. Please try again later.',
};

export const RoleCheck = {
  APP_USER: 'APP_USER',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

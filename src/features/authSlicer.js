import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : {};
const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

const initialState = {
  isAuth: token ? true : false,
  user: {
    username: userInfo ? userInfo.username : "",
    role: userInfo ? userInfo.role : "",
    token: token,
    userId: userInfo ? userInfo.id : "",
  },
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    requestLogin(state) {
      state.loading = true;
    },

    loginSuccess(state, action) {
      state.isAuth = true;
      state.user = {
        username: action.payload.user.username,
        role: action.payload.user.role,
        email: action.payload.user.email,
        token: action.payload.token,
        userId: action.payload.user.id,
      };
      state.loading = false;
      state.error = null;
    },

    loginFailure(state, action) {
      state.error = action.payload;
    },

    logoutSuccess(state) {
      state.isAuth = false;
      state.user = {};
      state.loading = false;
      state.error = null;
    },

    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    requestSignup(state) {
      state.loading = true;
    },

    signupSuccess(state) {
      state.loading = false;
      state.error = null;
    },

    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    signupPasswordFailure(state) {
      state.error = "The password entered does not match! Please try again.";
    }
  },
});

export const {
    requestLogin,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    requestSignup,
    signupSuccess,
    signupFailure,
    signupPasswordFailure,
} = authSlice.actions;

export const authActions = authSlice.actions;

export default authSlice.reducer;

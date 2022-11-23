import axios from "axios";
// import { actionType } from "../config/constant";

// import { useToast } from "@chakra-ui/react";

import {
  requestLogin,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  requestSignup,
  signupSuccess,
  signupFailure,
  signupPasswordFailure,
} from "../features/authSlicer";

import base64 from "base-64";

// const toast = useToast();

export const signUp = (dispatch, payload) => {
  payload.preventDefault();

  if (payload.target.password.value === payload.target.confirmPassword.value) {
    const data = {
      userName: payload.target.userName.value,
      email: payload.target.email.value,
      password: payload.target.password.value,
      role: payload.target.role.value,
    };

    try {
      if (payload.error) {
        dispatch(signupFailure(payload.error));
        console.log(payload.error);
      } else {
        dispatch(requestSignup());
        axios
          .post(`${process.env.REACT_APP_HEROKU_URL}/signup`, data)
          .then((res) => {
            dispatch(signupSuccess(res.data));
            // toast({
            //   title: "Account created.",
            //   description: "We've created your account for you.",
            //   status: "success",
            //   duration: 3000,
            //   isClosable: true,
            // });
            window.location.href = "/signin";
          })
          .catch((err) => {
            dispatch(signupFailure(err.response.data));
          });
      }
    } catch (err) {
      dispatch(signupFailure(err.response.data));
    }
  } else {
    dispatch(signupPasswordFailure());
  }
};

export const login = (dispatch, payload) => {
  payload.preventDefault();
  const user = {
    userName: payload.target.userName.value,
    password: payload.target.password.value,
  };
  const encoded = base64.encode(`${user.userName}:${user.password}`);
  try {
    if (payload.error) {
      dispatch(loginFailure(payload.error));
    } else {
      dispatch(requestLogin());
      axios
        .post(
          `${process.env.REACT_APP_HEROKU_URL}/signin`,
          {},
          {
            headers: {
              Authorization: `Basic ${encoded}`,
            },
          }
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("userId", res.data.user.id);
        })
        .catch((err) => {
          dispatch(loginFailure(err.response.data));
        });
    }
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const logout = (dispatch) => {
  try {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};

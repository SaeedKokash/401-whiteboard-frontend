import { createSlice } from '@reduxjs/toolkit';

const userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const initialState = {
    isAuth: token ? true : false,
    isNotLogged: false,
    isPassword: false,
    user: {
        username: userInfo ? userInfo.username : '',
        role: userInfo ? userInfo.role : '',
        token: token,
        userId: userInfo ? userInfo.id : '',
    },
    posts: [],
    comments: [],
    error: null,
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
        },

        logout: (state) => {
            state.isAuth = false;
            state.user = {};
            state.loading = false;
        },
        signup: (state, action) => {
            state.loading = false;
        }
    },
});

export const selectAuth = (state) => state.auth;

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
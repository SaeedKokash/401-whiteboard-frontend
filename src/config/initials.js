const userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

export const dataState = {
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


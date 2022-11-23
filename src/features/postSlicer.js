import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    comments: [],
    addAlert: false,
    deleteAlert: false,
    error: null,
    loading: false,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        requestPosts(state) {
            state.loading = true;
        },
        getPostsSuccess(state, action) {
            state.posts = action.payload;
        },
        getPostsFailure(state, action) {
            state.error = action.payload;
        },
        requestAddPost(state) {
            state.loading = true;
        },
        addPostSuccess(state, action) {
            state.posts = [...state.posts, action.payload];
        },
        addPostFailure(state, action) {
            state.error = action.payload;
        },
        requestDeletePost(state) {
            state.loading = true;
        },
        deletePostSuccess(state, action) {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        deletePostFailure(state, action) {
            state.error = action.payload;
        },
        
        requestDeleteComment(state) {
            state.loading = true;
        },

        deleteCommentSuccess(state, action) {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
        },
        deleteCommentFailure(state, action) {
            state.error = action.payload;
        },

        addAlert(state) {
            state.addAlert = true;
        },
        deleteAlert(state) {
            state.deleteAlert = true;
        },
        closeAlert(state) {
            state.addAlert = false;
            state.deleteAlert = false;
        },
    },
});

export const {
    requestPosts,
    getPostsSuccess,
    getPostsFailure,
    requestAddPost,
    addPostSuccess,
    addPostFailure,
    requestDeletePost,
    deletePostSuccess,
    deletePostFailure,
    requestDeleteComment,
    deleteCommentSuccess,
    deleteCommentFailure,
    addAlert,
    deleteAlert,
    closeAlert,
} = postSlice.actions;

export default postSlice.reducer;
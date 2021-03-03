import axios from 'axios';
import addAlert from '../actions/alertActionTypes';

const GET_POSTS = 'GET_POSTS';
const UPDATE_LIKES = 'UPDATE_LIKES';
const REMOVE_POST ='REMOVE_POST';
const CREATE_POST = 'CREATE_POST';
const GET_POST_BY_ID = 'GET_POST_BY_ID';
const ADD_COMMENT = 'ADD_COMMENT';

// Get All Posts:
export const fetchPosts = () => async dispatch => {
    try {
        const response = await axios.get('/api/posts/all');
        dispatch({
            type: GET_POSTS,
            data: response.data
        })
    } catch (err) {
        console.dir(err);
    }
}

// Get Post By Id:
export const getPost = postId => async dispatch => {
    try {
        const response = await axios(`/api/posts/${postId}`);
        dispatch({
            type: GET_POST_BY_ID,
            data: response.data
        })
    } catch (err) {
        console.dir(err);
    }
}

// Add Comment To Post
export const addComment = (postId, formData) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        text: formData
    });
    try {
        const response = await axios.put(`/api/posts/comment/${postId}`, body, config);
        dispatch({
            type: ADD_COMMENT,
            data: {id: postId, comment: response.data}
        })
    } catch (err) {
        console.dir(err);
    }
}

// Like Single Post:
export const likePost = postId => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
        const response = await axios.put(`/api/posts/like/${postId}`, config);
        dispatch({
            type: UPDATE_LIKES,
            data: { id: postId, likes: response.data }
        })
    } catch (err) {
        const data = {msg: 'You already liked this post', param: Math.random(), type: 'green'}
        dispatch(addAlert(data));
    }
}

// Unlike Single Post:
export const unlikePost = postId => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
        const response = await axios.put(`/api/posts/unlike/${postId}`, config);
        dispatch({
            type: UPDATE_LIKES,
            data: { id: postId, likes: response.data }
        })
    } catch (err) {
        const data = {msg: 'You have not been like this post yet', param: Math.random(), type: 'gray'}
        dispatch(addAlert(data));
    }
}

// Delete Post:
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: REMOVE_POST,
            data: postId
        })
    } catch (err) {
        console.dir(err);
    }
}

// Create New Post:
export const createPost = formData => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        text: formData
    })
    
    try {
        const response = await axios.post('/api/posts', body, config);
        dispatch({
            type: CREATE_POST,
            data: response.data
        })
    } catch (err) {
        console.dir(err);
    }
}
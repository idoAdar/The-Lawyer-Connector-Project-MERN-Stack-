import axios from 'axios';
import setAuthToken from '../../utills/setAuthToken';
import addAlert from './alertActionTypes';

const GET_USER_PROFILE = 'GET_USER_PROFILE';
const GET_ALL_PROFILES = 'GET_ALL_PROFILES';
const GET_PROFILE_BY_ID = 'GET_PROFILE_BY_ID';
const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
const ADD_EDUACTION = 'ADD_EDUACTION';
const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
const DELETE_EDUCATION = 'DELETE_EDUCATION';
const CLEAR_PROFILE = 'CLEAR_PROFILE';
const LOGOUT = 'LOGOUT';

// User Profile:
export const getProfileMe = () => async dispatch => {
    try {
        setAuthToken(localStorage.token);
        const response = await axios.get('/api/profile/me');
        dispatch({
            type: GET_USER_PROFILE,
            data: response.data
        })
    } catch (err) {
        const data = {msg: 'User Has No Profile', param: Math.random(), type: 'gray'};
        //dispatch(addAlert(data));
    }
}

// Get All Profiles:
export const getAllProfiles = () => async dispatch => {
        try {
            const response = await axios.get('/api/profile/all');
            dispatch({
                type: GET_ALL_PROFILES,
                data: response.data
            })
        } catch (err) {
            const errors = err.response.data.errors;
            errors.map(err => {
                dispatch(addAlert(err));
            })
        }
}

// Get Profile By Id:
export const getProfileById = id => async dispatch => {
    try {
        const response = await axios.get(`/api/profile/user/${id}`);
        dispatch({
            type: GET_PROFILE_BY_ID,
            data: response.data
        })        
    } catch (err) {
            dispatch(addAlert(err));
    }
}

// Create & Update Profile:
export const createProfile = (formData, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        ...formData
    });
    try {
        const response = await axios.post('/api/profile', body, config);
        dispatch({
            type: GET_USER_PROFILE,
            data: response.data
        })
        history.push('/dashboard');
        const data = {msg: 'Profile Updated', param: Math.random(), type: 'green'};
        dispatch(addAlert(data));
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(err => {
            dispatch(addAlert(err));
        })
    }
}

// Add Experience To Profile:
export const addExperience = (formData, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        ...formData
    });
    try {
        const response = await axios.put('/api/profile/experience', body, config);
        dispatch({
            type: ADD_EXPERIENCE,
            data: response.data
        })
        history.push('/dashboard');
        const data = {msg: 'Profile Updated', param: Math.random(), type: 'green'};
        dispatch(addAlert(data));
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(err => {
            dispatch(addAlert(err));
        })
    }
}

// Add Education To Profile:
export const addEducation = (formData, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        ...formData
    });
    try {
        const response = await axios.put('/api/profile/education', body, config);
        dispatch({
            type: ADD_EDUACTION,
            data: response.data
        });
        history.push('/dashboard');
        const data = {msg: 'Profile Updated', param: Math.random(), type: 'green'};
        dispatch(addAlert(data));
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(err => {
            dispatch(addAlert(err));
        })
    }
}

// Delete Experience:
export const deleteExperience = id => async dispatch => {
    const response = await axios.delete(`/api/profile/experience-remove/${id}`);
    dispatch({
        type: DELETE_EXPERIENCE,
        data: response.data
    });
    const data = {msg: 'Profile Updated', param: Math.random(), type: 'green'};
    dispatch(addAlert(data));
}

// Delete Education:
export const deleteEducation = id => async dispatch => {
    const response = await axios.delete(`/api/profile/education/delete/${id}`);
    dispatch({
        type: DELETE_EDUCATION,
        data: response.data
    });
    const data = {msg: 'Profile Updated', param: Math.random(), type: 'gray'};
    dispatch(addAlert(data));
}

// Remove Account:
export const removeAccount = history => async dispatch => {
    if (window.confirm('Are you sure you want to delete your account?')) {
        const response = await axios.delete('/api/users/remove');
        dispatch({
            type: CLEAR_PROFILE
        })
        dispatch({
            type: LOGOUT
        })
        history.push('/register');
        const data = {msg: 'Your account has been removed', param: Math.random(), type: 'gray'};
        dispatch(addAlert(data));
    }
}
import axios from 'axios';
import setAuthToken from '../../utills/setAuthToken';
import addAlert from './alertActionTypes';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_DENIED = 'REGISTER_DENIED';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const USER_LOADED = 'USER_LOADED';
const USER_DENIED  = 'USER_DENIED';
const LOGOUT = 'LOGOUT';
const CLEAR_PROFILE = 'CLEAR_PROFILE';
const SET_SPINNER = 'SET_SPINNER';

// Register User:
export const register = (name, email, password) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        name,
        email,
        password
    });
    try {
        const response = await axios.post('/api/users', body, config);
        const serialToken = response.data.token;
        const user = response.data.user;
        dispatch({
            type: REGISTER_SUCCESS,
            token: serialToken,
            user: user
        });
    } catch (err) {
        dispatch({
            type: REGISTER_DENIED
        })
        const errors = err.response.data.errors;
        errors.map(err => {
            dispatch(addAlert(err));
        })
    }
}

// Login User:
export const loginUser = (email, password) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        email,
        password
    });
    try {
        const response = await axios.post('/api/auth', body, config);
        const serialToken = response.data.token;
        const user = response.data.user;
        dispatch({
            type: LOGIN_SUCCESS,
            token: serialToken,
            user: user
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        const errors = err.response.data.errors;
        errors.forEach(err => {
            dispatch(addAlert(err))
        })
    }
}

// Load User (fire by useEffect in Layout):
export const loadUSer = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const response = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            user: response.data
        })
    } catch (err) {
        dispatch({
            type: USER_DENIED
        })
    }
}

// Logout User:
export const logoutUser = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: LOGOUT
    });
}

// Spinner:
export const spinnerHandler = () => dispatch => {
    dispatch({
        type: SET_SPINNER
    })
}
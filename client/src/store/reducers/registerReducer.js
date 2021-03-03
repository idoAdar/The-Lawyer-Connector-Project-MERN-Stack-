const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: null,
    user: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.token);
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.user
            };
        case 'REGISTER_DENIED':
        case 'LOGIN_FAIL':
        case 'USER_DENIED':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.user
            };
        case 'SET_SPINNER':
            return {
                ...state,
                isLoading: true
            }
    default: return state;
    }
}

export default reducer;
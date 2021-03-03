const initState = {
    profile: null,
    profiles: [],
    repository: null,
    isLoading: true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_USER_PROFILE':
        case 'ADD_EXPERIENCE':
        case 'DELETE_EXPERIENCE':
        case 'DELETE_EDUCATION':
            return {
                ...state,
                profile: action.data,
                isLoading: false
            }
        case 'GET_ALL_PROFILES':
            return {
                ...state,
                profiles: action.data,
                repository: null,
                isLoading: false
            }
        case 'GET_PROFILE_BY_ID':
            return {
                ...state,
                repository: action.data,
                isLoading: false
            }
        case 'CLEAR_PROFILE': 
            return {
                ...state,
                profile: null,
                isLoading: false
            }
        default: return state;
    }
}

export default reducer;
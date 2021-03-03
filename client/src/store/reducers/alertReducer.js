const initState = [];

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return state.concat(action.data);
        case 'REMOVE_ALERT':
            return state.filter(msg => msg.param !== action.param);
        default: return state;
    }
}

export default reducer;
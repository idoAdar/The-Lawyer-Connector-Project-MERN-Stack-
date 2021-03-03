const SET_ALERT = 'SET_ALERT';
const REMOVE_ALERT = 'REMOVE_ALERT';

const addAlert = (msg) => dispatch => {
    dispatch({
        type: SET_ALERT,
        data: {
            data: msg
        }
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            msgId: msg.param
        })
    }, 3000)
}

export default addAlert;
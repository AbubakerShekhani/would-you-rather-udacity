export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER'

function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        authenticated: id
    }
}

function removeAuthedUser() {
    return {
        type: REMOVE_AUTHED_USER,
        authenticated: null
    }
}

export function loginUser(userId) {
    return (dispatch) => {
        dispatch(setAuthedUser(userId))
    }
}


export function logoutUser() {
    return (dispatch) => {
        dispatch(removeAuthedUser())
    }
}
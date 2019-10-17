import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from '../actions/authentication'

export default function authentication(state=null, action) {
    switch(action.type) {
        case SET_AUTHED_USER:
            return action.authenticated
        case REMOVE_AUTHED_USER:
            return action.authenticated
        default:
            return state
    }
}
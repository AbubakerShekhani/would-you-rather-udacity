import { _getUsers } from '../utils/_DATA'
import { hideLoading, showLoading } from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'


function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function handleReceiveUsers() {


    return (dispatch) => {
        dispatch(showLoading())

        return _getUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}
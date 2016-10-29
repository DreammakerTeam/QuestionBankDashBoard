/**
 * Created by lusiwei on 2016/10/29.
 */

import * as usersAction from '../actions/users'

export function users(state = [], action) {
    switch (action.type) {
        case usersAction.SET_USERS:
            return action.users;
        default:
            return state;
    }
}

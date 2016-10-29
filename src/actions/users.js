/**
 * Created by lusiwei on 2016/10/29.
 */

export const SET_USERS = 'SET_USERS';

export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}

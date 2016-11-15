'use strict';

import { GET_USERS, USER_FILTER, SET_PAGE, SET_PAGE_COUNT, USER_ACTIVED, USER_REMOVED } from '../actions/users'

export function users(state = [], action) {
    let users;
    switch (action.type) {
        case GET_USERS:
            return action.users;
        case USER_ACTIVED:
            users = [].concat(state);
            users.forEach(function (e, index) {
                if (e._id === action.user._id) {
                    console.log(e, index);
                    users[index] = action.user;
                }
            });
            return users;
        case USER_REMOVED:
            users = [].concat(state);
            let pos = users.indexOf(action.user);
            if (pos !== -1) {
                users.splice(pos, 1);
            }
            return users;
        case USER_FILTER:
            return [action.user];
        default:
            return state;
    }
}

export function page(state = 1, action) {
    switch (action.type) {
        case SET_PAGE:
            return action.page;
        default:
            return state;
    }
}

export function pageCount(state = 1, action) {
    switch (action.type) {
        case SET_PAGE_COUNT:
            return action.count;
        default:
            return state;
    }
}

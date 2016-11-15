'use strict';

import { ADD_REGISTERING_USER, USERNAME_CHANGING, REMOVE_REGISTERING_USER } from '../actions/register'

export function registeringUsers(state = [''], action) {
    let arr;
    switch (action.type) {
		case ADD_REGISTERING_USER:
            arr = [].concat(state);
            if (arr[arr.length - 1] !== '') arr.push('');
			return arr;
        case USERNAME_CHANGING:
            arr = [].concat(state);
            arr[action.index] = action.username;
            return arr;
        case REMOVE_REGISTERING_USER:
            arr = [].concat(state);
            if (arr.length !== 1) arr.splice(action.index, 1);
            return arr;
		default:
			return state;
	}
}

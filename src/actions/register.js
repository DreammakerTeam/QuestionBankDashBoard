'use strict';

import $http from '../$http'
import base_config from '../config/base'
import hex_sha1 from '../sha1';

export const ADD_REGISTERING_USER = 'ADD_REGISTERING_USER';
export const USERNAME_CHANGING = 'USERNAME_CHANGING';
export const REMOVE_REGISTERING_USER = 'REMOVE_REGISTERING_USER';

export function fetchMulRegister(usernames, password, pxjg, bank_id) {
	return function () {
		return $http.post(`${base_config.host}/users/mulRegister`, {
			usernames,
			password: hex_sha1(password),
            pxjg,
            bank_id
		})
	}
}

export function addRegisteringUser() {
	return {
		type: ADD_REGISTERING_USER
	}
}

export function usernameChanging(username, index) {
    return {
        type: USERNAME_CHANGING,
        username,
        index
    }
}

export function removeRegisteringUser(index) {
    return {
        type: REMOVE_REGISTERING_USER,
        index
    }
}



'use strict';

import base_config from '../config/base'
import hex_sha1 from '../sha1'
import $http from '../$http'

export const DATA_VALIDATE = 'DATA_VALIDATE';
export const INPUT_TYPING = 'INPUT_TYPING';
export const SET_USER = 'SET_USER';

export function login(phone, password) {
    return function () {
        return $http.post(`${base_config.host}/users/login`, {
            username: phone,
            password: hex_sha1(password),
            uuid: 'admin'
        });
    }
}

export function dataValidate(phone, password) {
    return {
        type: DATA_VALIDATE,
        phone,
        password
    }
}

export function inputTyping(name, value) {
    return {
        type: INPUT_TYPING,
        name,
        value
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}

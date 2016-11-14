/*
* @Author: QBoooogle
* @Date:   2016-11-08 20:20:04
* @Last Modified by:   QBoooogle
* @Last Modified time: 2016-11-14 19:17:18
*/

'use strict';

import base_config from '../config/base'
import hex_sha1 from '../sha1'
import $http from '../$http'

export const INPUT_TYPING = 'INPUT_TYPING';
export const SET_USER = 'SET_USER';

export function login(phone, password) {
     return function() {
     	return $http.post(`${base_config.host}/users/login`, {
     		username : phone,
     		password : hex_sha1(password)
     	});
     }
 }

export function inputTyping(name, value) {
    return {
        type: INPUT_TYPING,
        name: '',
        value: ''
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        user: ''
    }
}

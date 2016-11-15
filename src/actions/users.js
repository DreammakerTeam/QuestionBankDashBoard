'use strict';

import $http from '../$http'
import base_config from '../config/base'

export const GET_USERS = 'GET_USERS';
export const USER_FILTER = 'USER_FILTER';
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
export const USER_ACTIVED = 'USER_ACTIVED';
export const USER_REMOVED = 'USER_REMOVED';

export function fetchUsers(page) {
    return function () {
        return $http.get(`${base_config.host}/users`, {
            size: base_config.user_count_per_page,
            page
        });
    }
}

export function fetchPageCount() {
    return function () {
        return $http.get(`${base_config.host}/users/page`, {
            count: base_config.user_count_per_page
        });
    }
}

export function fetchRemoveUser(user) {
    return function () {
        return $http.get(`${base_config.host}/users/remove`, {
            user_id: user._id
        });
    }
}

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function activeUser(user, bank_id) {
    return function () {
        return $http.post(`${base_config.host}/validates/${user._id}/${bank_id}`);
    }
}

export function fetchUserByUsername(username) {
    return function () {
        return $http.get(`${base_config.host}/users/username/${username}`);
    }
}

export function userFilter(user) {
    return {
        type: USER_FILTER,
        user
    }
}

export function setPage(page) {
    return {
        type: SET_PAGE,
        page
    }
}

export function setPageCount(count) {
    return {
        type: SET_PAGE_COUNT,
        count
    }
}

export function userActived(user) {
    return {
        type: USER_ACTIVED,
        user
    }
}

export function userRemoved(user) {
    return {
        type: USER_REMOVED,
        user
    }
}

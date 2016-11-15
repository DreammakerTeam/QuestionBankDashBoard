'use strict';

import $http from '../$http'
import base_config from '../config/base'

export const GET_BIG_BANK = 'GET_BIG_BANK';
export const GET_SMALL_BANK = 'GET_SMALL_BANK';
export const SET_ACTIVE_BANK = 'SET_ACTIVE_BANK';
export const DELETE_BIG_BANK = 'DELETE_BIG_BANK';
export const DELETE_SMALL_BANK = 'DELETE_SMALL_BANK';

export function fetchBigBank() {
    return function () {
        return $http.get(`${base_config.host}/banks`)
    }
}

export function fetchSmallBank(lastId) {
    return function () {
        return $http.get(`${base_config.host}/banks/${lastId}`)
    }
}

export function fetchCreateBigBank(name) {
    return function () {
        return $http.post(`${base_config.host}/banks`, {
            name
        })
    }
}

export function fetchCreateSmallBank(name, lastId) {
    return function () {
        return $http.post(`${base_config.host}/banks/${lastId}`, {
            name, lastId
        });
    }
}

export function fetchDeleteBank(id) {
    return function () {
        return $http.delete(`${base_config.host}/banks/${id}`);
    }
}

export function fetchUploadQuestion(lastId, id, data) {
    return function () {
        return $http.postFile(`${base_config.host}/banks/${lastId}/${id}`, data)
    }
}

export function getBigBank(banks) {
    return {
        type: GET_BIG_BANK,
        banks
    }
}

export function getSmallBank(banks) {
    return {
        type: GET_SMALL_BANK,
        banks
    }
}

export function setActiveBank(bank) {
    return {
        type: SET_ACTIVE_BANK,
        bank
    }
}

export function deleteBigBank(bank) {
    return {
        type: DELETE_BIG_BANK,
        bank
    }
}

export function deleteSmallBank(bank) {
    return {
        type: DELETE_SMALL_BANK,
        bank
    }
}

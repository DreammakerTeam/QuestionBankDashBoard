'use strict';

export const SET_REGISTER_NUM = 'SET_REGISTER_NUM';
export const SET_ACTIVE_NUM = 'SET_ACTIVE_NUM';

export function setRegisterNum(register_num) {
    return {
        type: SET_REGISTER_NUM,
        num: register_num
    }
}

export function setActiveNum(active_num) {
    return {
        type: SET_ACTIVE_NUM,
        num: active_num
    }
}

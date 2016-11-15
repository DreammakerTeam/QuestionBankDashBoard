'use strict';

import { SET_ACTIVE_NUM, SET_REGISTER_NUM } from '../actions/introduce'

export function activeNum(state = 0, action) {
    switch (action.type) {
        case SET_ACTIVE_NUM:
            return action.num;
        default:
            return state;
    }
}

export function registerNum(state = 0, action) {
    switch (action.type) {
        case SET_REGISTER_NUM:
            return action.num;
        default:
            return state
    }
}

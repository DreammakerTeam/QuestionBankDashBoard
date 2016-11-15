'use strict';

import { INPUT_TYPING, SET_USER } from '../actions/login'

export function inputTyping(state = {username: '', password: ''}, action) {
    switch (action.type) {
        case INPUT_TYPING:
            let new_state = Object.assign({}, state);
            new_state[action.name] = action.value;

            return new_state;
        default:
            return state;
    }
}

export function setUser(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, action);
        default:
            return state;
    }
}

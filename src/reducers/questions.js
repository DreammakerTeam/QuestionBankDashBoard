/**
 * Created by chenya on 2016/11/9.
 */

'use strict';

import { GET_BIG_BANK, GET_SMALL_BANK, SET_ACTIVE_BANK, DELETE_BIG_BANK, DELETE_SMALL_BANK } from '../actions/questions'

export function bigBanks(state = [], action) {
    let arr;
    switch (action.type) {
        case GET_BIG_BANK:
            if (action.banks.isArray) {
                arr = [].concat(action.banks);
            } else {
                arr = [].concat(state);
                arr.push(action.banks);
            }
            return arr;
        case DELETE_BIG_BANK:
            arr = [].concat(state);
            let pos = arr.indexOf(action.bank);
            if (pos !== -1) arr.splice(pos, 1);
            return arr;
        default:
            return state;
    }
}

export function smallBanks(state = [], action) {
    let arr;
    switch (action.type) {
        case GET_SMALL_BANK:
            if (action.banks.isArray) {
                arr = [].concat(action.banks);
            } else {
                arr = [].concat(state);
                arr.push(action.banks);
            }
            return arr;
        case DELETE_SMALL_BANK:
            arr = [].concat(state);
            let pos = arr.indexOf(action.bank);
            if (pos !== -1) arr.splice(pos, 1);
            return arr;
        default:
            return state;
    }
}

export function activeBank(state = {}, action) {
    switch (action.type) {
        case SET_ACTIVE_BANK:
            return Object.assign({}, action.bank);
        default:
            return state;
    }
}

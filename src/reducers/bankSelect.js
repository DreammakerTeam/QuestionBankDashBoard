'use strict';

import { CHANGE_TARGET_BANK_ID } from '../actions/bankSelect'

export function targetBigBankId(state = '', action) {
    switch (action.type) {
        case CHANGE_TARGET_BANK_ID:
            if (action.bank_type === 'big') return action.bank_id;
        default:
            return state;
    }
}

export function targetSmallBankId(state = '', action) {
    switch (action.type) {
        case CHANGE_TARGET_BANK_ID:
            if (action.bank_type === 'small') return action.bank_id;
        default:
            return state;
    }
}


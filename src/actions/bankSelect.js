'use strict';

export const CHANGE_TARGET_BANK_ID = 'CHANGE_TARGET_BANK_ID';

export function changeTargetBankId(bank_id, bank_type) {
    return {
        type: CHANGE_TARGET_BANK_ID,
        bank_id,
        bank_type
    }
}

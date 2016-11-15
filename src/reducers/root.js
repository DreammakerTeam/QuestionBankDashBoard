'use strict';

import { combineReducers } from 'redux'
import { inputTyping, setUser } from './login'
import { activeNum, registerNum } from './introduce'
import { users, page, pageCount } from './users'
import { registeringUsers } from './register'
import { bigBanks, smallBanks, activeBank } from './questions'
import { targetBigBankId, targetSmallBankId } from './bankSelect'

export default combineReducers({
    inputTyping,
    setUser,
    activeNum,
    registerNum,
    users,
    page,
    pageCount,
    registeringUsers,
    bigBanks,
    smallBanks,
    activeBank,
    targetBigBankId,
    targetSmallBankId
});

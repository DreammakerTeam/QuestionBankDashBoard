/**
 * Created by lusiwei on 2016/10/29.
 */
//import { combineReducers } from 'redux'
//
//import * as users from './users'
//
//export default combineReducers(Object.assign({},
//    users
//));

'use strict';

import { combineReducers } from 'redux'
import { bigBanks, smallBanks, activeBank } from './questions'

export default combineReducers({
    bigBanks,
    smallBanks,
    activeBank
});

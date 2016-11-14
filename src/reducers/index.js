/**
 * Created by lusiwei on 2016/10/29.
 */
import { combineReducers } from 'redux'

import * as users from './users'

export default combineReducers(Object.assign({},
    users
));

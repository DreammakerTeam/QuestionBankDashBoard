/*
* @Author: QBoooogle
* @Date:   2016-11-08 21:04:20
* @Last Modified by:   QBoooogle
* @Last Modified time: 2016-11-08 21:19:01
*/

'use strict';
import { combineReducers } from 'redux'
import { inputTyping, setUser } from './login'

export default combineReducers({
	inputTyping,
	setUser
})
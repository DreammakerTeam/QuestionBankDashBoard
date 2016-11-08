/*
* @Author: QBoooogle
* @Date:   2016-11-08 21:20:05
* @Last Modified by:   QBoooogle
* @Last Modified time: 2016-11-08 21:21:18
*/

'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/root'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

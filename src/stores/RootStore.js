'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/root'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

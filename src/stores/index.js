/**
 * Created by lusiwei on 2016/10/29.
 */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

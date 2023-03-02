import {combineReducers} from 'redux'
import clientReducer from "./client";

const reducers = combineReducers({
    clientReducer,
})
export type ReducerType = typeof reducers

export default reducers


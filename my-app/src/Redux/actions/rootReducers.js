import {combineReducers} from 'redux';
import userReducer from './userReducer'
import storeReducer from '../storesRedux/storeReducer'
const rootReducer = combineReducers({
    user:userReducer,
    store:storeReducer
})
export default rootReducer
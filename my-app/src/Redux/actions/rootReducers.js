import {combineReducers} from 'redux';
import userReducer from './userReducer'
import storeReducer from '../storesRedux/storeReducer'
import dashBoardReducer from '../dashboardRedux/dashBoardReducer'
import darkReducer from '../Darkmode/reducer';
const rootReducer = combineReducers({
    user:userReducer,
    store:storeReducer,
    profile:dashBoardReducer,
    dark:darkReducer,
})
export default rootReducer
import {
    FETCH_STORE_SUCCESS,
    FETCH_STORE_FAIL,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAIL,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    UPDATE_COMMENT_STATUS_FAIL,
    UPDATE_COMMENT_STATUS_SUCCESS,
    FETCH_STORES_FAIL,
    FETCH_STORES_SUCCESS,
    FETCH_USER_COMMENT_SUCCESS,
    FETCH_USER_COMMENT_FAIL,
} from './types'
const inistialState={
    store:null,
    comments:[],
    errors:null
}
const storeReducer = (state = inistialState , action) =>{
    switch(action.type) {
        case FETCH_STORE_SUCCESS:
            return {
                ...state,
                store:action.payload,
                error:null
            }
        case FETCH_STORE_FAIL:
            return {
                ...state,
                store:null,
                error:action.payload
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments:action.payload,
                error:null
            }
        case FETCH_COMMENTS_FAIL:
            return{
                ...state,
                comments:[],
                error:action.payload
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                comments:action.payload,
                error:null
            }
        case ADD_COMMENT_FAIL:
            return {
                ...state,
                comments:[],
                error:action.payload
            }
        case UPDATE_COMMENT_STATUS_SUCCESS:
            return{
            ...state,
            error:null
            }
        case UPDATE_COMMENT_STATUS_FAIL:
            return {
                ...state,
                error:action.payload
            }
            case FETCH_STORES_SUCCESS:
                return {
                ...state,
                stores: action.payload,
                error: null,
                };
                case FETCH_STORES_FAIL:
                    return {
                    ...state,
                    stores: [],
                    error: action.payload,
                    };
                case FETCH_USER_COMMENT_SUCCESS:
                    return {
                        ...state,
                        comments:action.payload,
                        error:null,
                    }
                case FETCH_USER_COMMENT_FAIL:
                    return {
                        ...state,
                        comments:[],
                        error:action.payload
                    }
        default:
            return state
    }
}
export default storeReducer
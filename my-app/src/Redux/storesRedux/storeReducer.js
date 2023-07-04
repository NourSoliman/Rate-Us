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
    FETCH_EDITED_COMMENTS_FAIL,
    FETCH_EDITED_COMMENTS_SUCCESS,
    FETCH_DELETE_COMMENTS_SUCCESS,
    FETCH_DELETE_COMMENTS_FAIL,
    UPVOTE_COMMENT_FAIL,
    UPVOTE_COMMENT_SUCCESS,
    DOWNVOTE_COMMENT_FAIL,
    DOWNVOTE_COMMENT_SUCCESS,
    FETCH_STORES_TYPES_SUCCESS,
    FETCH_STORES_TYPES_FAIL,
} from './types'
const inistialState = {
    store: null,
    stores:[],
    comments: [],
    errors: null,
    loading: true,
    deleteLoading:true,
    editLoading:true,
    upLoading:true,
}
const storeReducer = (state = inistialState, action) => {
    switch (action.type) {
        case FETCH_STORE_SUCCESS:
            return {
                ...state,
                store: action.payload,
                error: null,
                loading: false,
            }
        case FETCH_STORE_FAIL:
            return {
                ...state,
                store: null,
                error: action.payload,
                loading: false,
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                error: null,
                loading: false,
            }
        case FETCH_COMMENTS_FAIL:
            return {
                ...state,
                comments: [],
                error: action.payload,
                loading: false,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                error: null,
                loading: false,
            }
        case ADD_COMMENT_FAIL:
            return {
                ...state,
                comments: [],
                error: action.payload,
                loading: false,
            }
        case UPDATE_COMMENT_STATUS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
            }
        case UPDATE_COMMENT_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case FETCH_STORES_SUCCESS:
            return {
                ...state,
                stores: action.payload,
                error: null,
                loading: false,
            };
        case FETCH_STORES_FAIL:
            return {
                ...state,
                stores: [],
                error: action.payload,
                loading: false,
            };
        case FETCH_USER_COMMENT_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                error: null,
                loading: false,
            }
        case FETCH_USER_COMMENT_FAIL:
            return {
                ...state,
                comments: [],
                error: action.payload,
                loading: false,
            }
        case FETCH_EDITED_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                error: null,
                editLoading: false
            }
        case FETCH_EDITED_COMMENTS_FAIL:
            return {
                ...state,
                comments: [],
                error: action.payload,
                editLoading: false,
            }
        case FETCH_DELETE_COMMENTS_SUCCESS:
            const updatedComments = state.comments.filter(comment => comment._id !== action.payload);
            return {
                ...state,
                comments:updatedComments,
                deleteLoading:false,
                error:null
            }
        case FETCH_DELETE_COMMENTS_FAIL:
            return{
                ...state,
                comments:[],
                deleteLoading:false,
                error:action.payload
            }
        case UPVOTE_COMMENT_SUCCESS:
        case DOWNVOTE_COMMENT_SUCCESS:
            //first way
            const updatedVotesComments = action.payload
            // const commentIndex = state.comments.findIndex(comment=>comment._id===updatedVotesComments._id)
                  // Create a new comments array with the updated comment at the appropriate index
                // const updatedvotesComments = [...state.comments];
                // updatedvotesComments[commentIndex] = updatedVotesComments;
            // return{
            //     ...state,
            //     comments:updatedVotesComments,
            //     errors:null
            // }
            //2nd one
            return {
            ...state,
            comments:state.comments.map(comment=> comment.id === updatedVotesComments._id ? updatedVotesComments : comment),
            errors: null,

            }
            case UPVOTE_COMMENT_FAIL:
            case DOWNVOTE_COMMENT_FAIL:
                return {
                    ...state,
                    errors:action.payload,
                    upLoading:false,
                }
            case FETCH_STORES_TYPES_SUCCESS:{
                return {
                    ...state,
                    stores:action.payload,
                    error:null,
                    loading: false,
                }
            }
            case FETCH_STORES_TYPES_FAIL:{
                return{
                    ...state,
                    stores:[],
                    error:action.payload,
                    loading: false,
                }
            }
        default:
            return state
    }
}
export default storeReducer
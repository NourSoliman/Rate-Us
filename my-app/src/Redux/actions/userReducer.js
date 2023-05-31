import { REGISTER_SUCCESS, REGISTER_FAIL
    , LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT_SUCCESS 
    , GET_USER_FAIL , GET_USER_SUCCESS
    ,CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    ADD_STORE_REQUEST,ADD_STORE_SUCCESS,
    ADD_STORE_FAIL,
} from './types';
    const storedUserName = localStorage.getItem('userName');
const inistialState={
    user:null,
    msg:null,
    error:null,
    token:null,
    userName:storedUserName,
    otp:``,
    loggedIn:false,
    loading:false,
    passwordLoading:false,
    passwordError:null,
    stores:[],
}
const userReducer = (state = inistialState , action) =>{
    switch(action.type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                msg:action.payload.msg,
                error:null
            };
        case REGISTER_FAIL:
            return {
                ...state,
                user:null,
                msg:null,
                error:action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('userName', action.payload.userName);
            return {
                ...state,
                user:action.payload.user,
                msg:action.payload.msg,
                token:action.payload.token,
                userName:action.payload.userName,
                error:null,
                loggedIn:true,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                user:null,
                msg:null,
                token:null,
                loggedIn:false,
                error:action.payload
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('userName');
            return {
                ...state,
                user:null,
                error:null,
                token:null,
                msg:action.payload,
                loggedIn:false
            }
        case GET_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                msg:action.payload,
                error:null
            }
        case GET_USER_FAIL:
            return{
                ...state,
                user:null,
                msg:null,
                error:action.payload
            }
        case CHANGE_PASSWORD_REQUEST:
            return{
                ...state,
                passwordLoading:true,
                passwordError:null,
            }
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                passwordLoading:false,
                passwordError:null,
                msg:action.payload
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                passwordLoading:false,
                passwordError:action.payload,
                msg:null
            }
        case ADD_STORE_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            }
        case ADD_STORE_SUCCESS:
            return{
                ...state,
                loading:false,
                msg:action.payload
            }
        case ADD_STORE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}
export default userReducer
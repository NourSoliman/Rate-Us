
import { REGISTER_SUCCESS, REGISTER_FAIL
    , LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT_SUCCESS 
    , GET_USER_FAIL , GET_USER_SUCCESS
    ,CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    ADD_STORE_REQUEST,ADD_STORE_SUCCESS,
    ADD_STORE_FAIL,
    FETCH_PROFILE_COMMENTS_FAIL,
    FETCH_PROFILE_COMMENTS_SUCCESS,
    FETCH_PROFILE_COMMENTS_FIRST
} from './types';
    const storedUserName = localStorage.getItem('userName');
    // const storedRole = localStorage.getItem('role');
    // const token = Cookies.get('token');
    // const decodedToken = jwt_decode(token)
    // const storedRole = decodedToken.role
const inistialState={
    user:null,
    msg:null,
    error:null,
    token:null,
    userName:storedUserName,
    otp:``,
    loggedIn:false,
    loading:true,
    isLoading:false,
    passwordLoading:false,
    passwordError:null,
    stores:[],
    comments: [],
    age:null,
    commentCount:null,
    gender:null,
    creationDate:null,
}
const userReducer = (state = inistialState , action) =>{
    switch(action.type){
    case FETCH_PROFILE_COMMENTS_FIRST:
    case CHANGE_PASSWORD_REQUEST:
        return {
            ...state,
            isLoading:true,
        }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                msg:action.payload.msg,
                error:null,
                loading:false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                user:null,
                msg:null,
                error:action.payload,
                loading:false
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('userName', action.payload.userName);
            // const decodedToken = jwt_decode(action.payload.token);
            // const role = decodedToken.role;
            // console.log(role , `from redux`)
            return {
                ...state,
                user:action.payload.user,
                msg:action.payload.msg,
                token:action.payload.token,
                userName:action.payload.userName,
                error:null,
                loggedIn:true,
                loading:false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                user:null,
                msg:null,
                token:null,
                loggedIn:false,
                error:action.payload,
                loading:false,
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('userName');
            return {
                ...state,
                user:null,
                error:null,
                token:null,
                msg:action.payload,
                role:``,
                loggedIn:false
            }
        case GET_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                msg:action.payload,
                loading:false,
                error:null
            }
        case GET_USER_FAIL:
            return{
                ...state,
                user:null,
                msg:null,
                loading:false,
                error:action.payload
            }
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                passwordLoading:false,
                passwordError:null,
                msg:action.payload,
                isLoading:false,
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                passwordLoading:false,
                passwordError:action.payload,
                msg:null,
                isLoading:false,
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
        case FETCH_PROFILE_COMMENTS_SUCCESS:
            return {
                ...state,
                loading:false,
                comments:action.payload.comments,
                age:action.payload.age,
                commentCount:action.payload.commentCount,
                gender:action.payload.gender,
                creationDate:action.payload.creationDate,
                isLoading:false,
            }
        case FETCH_PROFILE_COMMENTS_FAIL:
            return {
                ...state,
                loading:false,
                comments:[],
                error:action.payload,
                age:null,
                commentCount:null,
                gender:null,
                creationDate:null,
                isLoading:false,
            }
        default:
            return state
    }
}
export default userReducer
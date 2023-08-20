import { DASHBOARD_PROFILE_DETAILS , DASHBOARD_COMMENTS , DASHBOARD_PROFILE_DETAILS_FIRST ,  DASHBOARD_COMMENTS_FIRST} from "./Types";
const inistialState = {
    profileDetails:true,
    profileComments:false,
    isLoading:false,
}
const profileReducer = (state = inistialState , action) =>{
    switch(action.type){
        // case DASHBOARD_COMMENTS_FIRST:
        // case DASHBOARD_PROFILE_DETAILS_FIRST:
        //     return {
        //         ...state,
        //         isLoading:true,
        //     }
        case DASHBOARD_PROFILE_DETAILS:
            return {
                ...state,
                profileDetails:true,
                profileComments:false,
                isLoading:true,
                
            };
        case DASHBOARD_COMMENTS:
            return{
                ...state,
                isLoading:true,
                profileDetails:false,
                profileComments:true,
            }
        default:
            return state;
    }
}
export default profileReducer
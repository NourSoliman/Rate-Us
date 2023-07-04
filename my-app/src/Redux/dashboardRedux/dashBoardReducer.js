import { DASHBOARD_PROFILE_DETAILS , DASHBOARD_COMMENTS } from "./Types";
const inistialState = {
    profileDetails:true,
    profileComments:false,
    loading:false,
}
const profileReducer = (state = inistialState , action) =>{
    switch(action.type){
        case DASHBOARD_PROFILE_DETAILS:
            return {
                ...state,
                profileDetails:true,
                profileComments:false,
                loading:true,
                
            };
        case DASHBOARD_COMMENTS:
            return{
                ...state,
                loading:true,
                profileDetails:false,
                profileComments:true,
            }
        default:
            return state;
    }
}
export default profileReducer
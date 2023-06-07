import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';
import {
    FETCH_STORE_SUCCESS,
    FETCH_STORE_FAIL,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAIL,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    UPDATE_COMMENT_STATUS_FAIL,
    UPDATE_COMMENT_STATUS_SUCCESS,
    FETCH_STORES_SUCCESS,
    FETCH_STORES_FAIL,
    FETCH_USER_COMMENT_FAIL,
    FETCH_USER_COMMENT_SUCCESS,
    FETCH_EDITED_COMMENTS_FAIL,
    FETCH_EDITED_COMMENTS_SUCCESS,
    FETCH_DELETE_COMMENTS_FAIL,
    FETCH_DELETE_COMMENTS_SUCCESS,
} from './types'

//Get the token from cookies
const getBearerToken = () =>{
  const token = Cookies.get(`token`)
  return token
}
export const fetchStore = (storeId) => {
    return async (dispatch) => {
      try {
        const token = getBearerToken()
        const storeResponse = await axios.get(`http://localhost:1997/api/stores/${storeId}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        //Render.com
        // const storeResponse = await axios.get(`https://rate-us.onrender.com/api/stores/${storeId}`,{
        //   headers:{
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        dispatch({
          type: FETCH_STORE_SUCCESS,
          payload: storeResponse.data.store
        });
  
        const commentsResponse = await axios.get(`http://localhost:1997/api/stores/${storeId}/comments`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        //RENDER
        // const commentsResponse = await axios.get(`https://rate-us.onrender.com/api/stores/${storeId}/comments`,{
        //   headers:{
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        console.log(`commentsResponse` , commentsResponse);
        dispatch({
          type: FETCH_COMMENTS_SUCCESS,
          payload: commentsResponse.data
        });
      } catch (error) {
        dispatch({
          type: FETCH_STORE_FAIL,
          error: error.message
        });
        dispatch({
          type: FETCH_COMMENTS_FAIL,
          error: error.message
        });
      }
    };
  };

export const addComment = (storeId, newComment) =>{
    return async(dispatch) =>{
        try{
          const token = getBearerToken();
          const decodedToken = jwtDecode(token)
          const userName = decodedToken.userName
          newComment.commenter = userName
        await axios.post(`http://localhost:1997/api/stores/${storeId}/comments`, newComment , {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const response = await axios.get(`http://localhost:1997/api/stores/${storeId}/comments`,{
          header:{
            Authorization: `Bearer ${token}`
          }
        })
        //RENDER
        // await axios.post(`https://rate-us.onrender.com/api/stores/${storeId}/comments`, newComment , {
        //   headers:{
        //     Authorization: `Bearer ${token}`
        //   }
        // })
        // const response = await axios.get(`https://rate-us.onrender.com/api/stores/${storeId}/comments`,{
        //   header:{
        //     Authorization: `Bearer ${token}`
        //   }
        // })
        dispatch({
            type:ADD_COMMENT_SUCCESS,
            payload:response.data.comments
        })
        }catch(error){
            dispatch({
                type:ADD_COMMENT_FAIL,
                payload:error.message
            })
        }
    }
}
export const updateCommentStatus = (storeId , commentId, newStatus) =>{
  return async(dispatch) =>{
    try{
      console.log('Before dispatching updateCommentStatus');
    
    const token = getBearerToken()
    await axios.put(`http://localhost:1997/api/stores/${storeId}/comment/${commentId}`,{
      status:newStatus
    },
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    //RENDER
    // await axios.put(`https://rate-us.onrender.com/api/stores/${storeId}/comment/${commentId}`,{
    //   status:newStatus
    // },
    // {
    //   headers:{
    //     Authorization:`Bearer ${token}`
    //   }
    // })
    dispatch({
      type:UPDATE_COMMENT_STATUS_SUCCESS,
      payload:{
        storeId,
        commentId,
        newStatus
      }
    })
    console.log('After dispatching updateCommentStatus');

  }
  catch(error){
    dispatch({
      type: UPDATE_COMMENT_STATUS_FAIL,
      payload: error.message
    });
  }
  }
}
//Bring stores from DB
export const fetchStores = () =>{
  return async (dispatch)=>{
      try{
        const token = getBearerToken()
      const response = await fetch('http://localhost:1997/api/stores',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      //Render
      // const response = await fetch('https://rate-us.onrender.com/api/stores',{
      //   headers:{
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      const data = await response.json();
      dispatch({
          type:FETCH_STORE_SUCCESS,
          payload:data.stores
      })
      }catch(error){
          dispatch({
              type:FETCH_STORE_FAIL,
              payload:error.message
          })
      }
  }
}
//Bring all stores from db
export const fetchAllStores = () => {
  return async (dispatch) => {
    try {
      const token = getBearerToken()
      const response = await fetch('http://localhost:1997/api/allStores',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      //RENDER
      // const response = await fetch('https://rate-us.onrender.com/api/allStores',{
      //   headers:{
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      const data = await response.json();
      dispatch({
        type: FETCH_STORES_SUCCESS,
        payload: data.stores,
      });
    } catch (error) {
      dispatch({
        type: FETCH_STORES_FAIL,
        payload: error.message,
      });
    }
  };
};
export const fetchUserComments = () => {
  return async (dispatch) => {
    try {
      const token = getBearerToken()
      const response = await axios.get('http://localhost:1997/api/userComments',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      //Render
      // const response = await axios.get('https://rate-us.onrender.com/api/userComments',{
      //   headers:{
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      dispatch({
        type: FETCH_USER_COMMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_USER_COMMENT_FAIL,
        payload: error.message,
      });
    }
  };
}
//fetch Edit 
export const fetchEditedComments = (storeId ,commentId , updatedCommentText) =>{
  return async(dispatch) =>{
    try{
      const token = getBearerToken()
      const headers={
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      await axios.put(`http://localhost:1997/api/stores/comments/${commentId}`,{
        commentText:updatedCommentText
      },
      {
        headers:headers
      }
      )
            // Fetch the updated comments after the successful update
            const response = await axios.get(`http://localhost:1997/api/stores/${storeId}/comments`, {
              headers: headers,
            });
            const updatedComments = response.data.comments;
      dispatch({
        type:FETCH_EDITED_COMMENTS_SUCCESS,
        payload:updatedComments,
      })
    }catch(error) {
      console.log(error)
      dispatch({
        type:FETCH_EDITED_COMMENTS_FAIL,
        error:error.message
      })
    }
  }
}
export const fetchDeleteComment = (commentId , storeId) =>{
  return async(dispatch) =>{
    try{
      const token = getBearerToken()
      const headers = {
        Authorization:`Bearer ${token}`,
        'Content-Type':`application/json`
      };
      await axios.delete(`http://localhost:1997/api/stores/comments/${commentId}`,{
        headers:headers
      })
      dispatch({
        type:FETCH_DELETE_COMMENTS_SUCCESS,
        payload:commentId
      })
      const response = await axios.get(`http://localhost:1997/api/stores/${storeId}/comments`,{
        headers:headers
      })
      const updatedComments = response.data.comments
      dispatch({
        type:FETCH_COMMENTS_SUCCESS,
        payload:updatedComments
      })
    }
    catch(error){
      dispatch({
        type: FETCH_DELETE_COMMENTS_FAIL,
        payload: error.message
      });
    }
  }
}
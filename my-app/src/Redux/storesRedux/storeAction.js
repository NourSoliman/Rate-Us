import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
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
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAIL,
  DOWNVOTE_COMMENT_SUCCESS,
  DOWNVOTE_COMMENT_FAIL,
  FETCH_STORES_TYPES_FAIL,
  FETCH_STORES_TYPES_SUCCESS,
  FETCH_STORE_FIRST,
  FETCH_STORES_FIRST,
  FETCH_STORES_TYPES_FIRST,
  FETCH_COMMENTS_FIRST,
  ADD_COMMENT_FIRST,
  UPDATE_COMMENT_STATUS_FIRST,
  FETCH_USER_COMMENT_FIRST,
  FETCH_EDITED_COMMENTS_FIRST,
  FETCH_DELETE_COMMENTS_FIRST,
} from "./types";
// const localHost = `http://localhost:1997/api`
// const localHost=`https://rate-us.onrender.com/api`
    //vercel
    const localHost="https://rate-us-x53q-4xxji8ec5-noursoliman.vercel.app/api"
//Get the token from cookies
const getBearerToken = () => {
  const token = Cookies.get(`token`);
  return token;
};
export const fetchStore = (storeId, filterStatus) => {
  return async (dispatch) => {
    try {
      dispatch({type:FETCH_STORE_FIRST})
      dispatch({type:FETCH_COMMENTS_FIRST})
      const token = getBearerToken();
      //Render.com
      const storeResponse = await axios.get(
        `${localHost}/stores/${storeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_STORE_SUCCESS,
        payload: storeResponse.data.store,
      });
      //Render.com
      let commentsEndPoints = `${localHost}/stores/${storeId}/comments`;
      if (filterStatus) {
        commentsEndPoints += `?filterStatus=${filterStatus}`;
      }
      const commentsResponse = await fetch(commentsEndPoints, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const commentsData = await commentsResponse.json();
      console.log(`commentsResponse`, commentsResponse);
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: commentsData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_STORE_FAIL,
        error: error.message,
      });
      dispatch({
        type: FETCH_COMMENTS_FAIL,
        error: error.message,
      });
    }
  };
};

export const addComment = (storeId, newComment) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      const decodedToken = jwtDecode(token);
      const userName = decodedToken.userName;
      newComment.commenter = userName;
      //RENDER
      // dispatch({type:ADD_COMMENT_FIRST})
      await axios.post(
        `${localHost}/stores/${storeId}/comments`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        `${localHost}/stores/${storeId}/comments`,
        {
          header: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: response.data.comments,
      });
    } catch (error) {
      dispatch({
        type: ADD_COMMENT_FAIL,
        payload: error.message,
      });
    }
  };
};

export const updateCommentStatus = (storeId, commentId, newStatus) => {
  return async (dispatch) => {
    try {
      console.log("Before dispatching updateCommentStatus");

      const token = getBearerToken();
      //RENDER
      dispatch({type:UPDATE_COMMENT_STATUS_FIRST})
      await axios.put(
        `${localHost}/stores/${storeId}/comment/${commentId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: UPDATE_COMMENT_STATUS_SUCCESS,
        payload: {
          storeId,
          commentId,
          newStatus,
        },
      });
      console.log("After dispatching updateCommentStatus");
    } catch (error) {
      dispatch({
        type: UPDATE_COMMENT_STATUS_FAIL,
        payload: error.message,
      });
    }
  };
};
//Bring stores from DB
export const fetchStores = () => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      // await dispatch({type:FETCH_COMMENTS_FIRST})
      dispatch({type:FETCH_STORE_FIRST})
      //Render
      const response = await fetch(`${localHost}/stores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch({
        type: FETCH_STORE_SUCCESS,
        payload: data.stores,
      });
    } catch (error) {
      dispatch({
        type: FETCH_STORE_FAIL,
        payload: error.message,
      });
    }
  };
};
//Bring all stores from db
export const fetchAllStores = (type) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      dispatch({type:FETCH_STORES_FIRST})
      //RENDER
      let url = `${localHost}/allStores`;
      if (type) {
        url += `?type=${type}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = getBearerToken();
      dispatch({type:FETCH_USER_COMMENT_FIRST})
      //Render
      const response = await axios.get(
        `${localHost}/userComments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
};
//fetch Edit
export const fetchEditedComments = (storeId, commentId, updatedCommentText) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      dispatch({type:FETCH_EDITED_COMMENTS_FIRST})
      //Render.com
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.put(
        `${localHost}/stores/comments/${commentId}`,
        {
          commentText: updatedCommentText,
        },
        {
          headers: headers,
        }
      );
      // Fetch the updated comments after the successful update
      const response = await axios.get(
        `${localHost}/stores/${storeId}/comments`,
        {
          headers: headers,
        }
      );
      const updatedComments = response.data.comments;
      dispatch({
        type: FETCH_EDITED_COMMENTS_SUCCESS,
        payload: updatedComments,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_EDITED_COMMENTS_FAIL,
        error: error.message,
      });
    }
  };
};
export const fetchDeleteComment = (commentId, storeId) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      dispatch({type:FETCH_DELETE_COMMENTS_FIRST})
      //Render.com
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": `application/json`,
      };
      await axios.delete(
        `${localHost}/stores/comments/${commentId}`,
        {
          headers: headers,
        }
      );
      dispatch({
        type: FETCH_DELETE_COMMENTS_SUCCESS,
        payload: commentId,
      });
      const response = await axios.get(
        `${localHost}/stores/${storeId}/comments`,
        {
          headers: headers,
        }
      );
      const updatedComments = response.data.comments;
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: updatedComments,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DELETE_COMMENTS_FAIL,
        payload: error.message,
      });
    }
  };
};
export const fetchUpVotes = (commentId) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();

      //Render.com
      const response = await fetch(
        `${localHost}/stores/upVotes/${commentId}`,
        {
          method: `PUT`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        }
      );
      const updatedComments = response.data.comment;
      console.log(updatedComments , `updated comments`)
      dispatch({
        type: UPVOTE_COMMENT_SUCCESS,
        payload: updatedComments,
      });
    } catch (error) {
      dispatch({
        type: UPVOTE_COMMENT_FAIL,
        error: error.message,
      });
    }
  };
};
export const fetchDownVotes = (commentId) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      //RENDER.com
      const response = await fetch(
        `${localHost}/stores/downVotes/${commentId}`,
        {
          method: `PUT`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        }
      );
      const updatedComments = response.data.comment;
      dispatch({
        type: DOWNVOTE_COMMENT_SUCCESS,
        payload: updatedComments,
      });
    } catch (error) {
      dispatch({
        type: DOWNVOTE_COMMENT_FAIL,
        error: error.message,
      });
    }
  };
};
export const fetchStoreTypes = (sellingTypes) => {
  return async (dispatch) => {
    try {
      const token = getBearerToken();
      //RENDER.Com
      const response = await fetch(
        `${localHost}/stores/selling/${sellingTypes}`,
        {
          method: `GET`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const stores = data.stores;
      console.log(data, `from store action now`);
      dispatch({
        type: FETCH_STORES_TYPES_SUCCESS,
        payload: stores,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        types: FETCH_STORES_TYPES_FAIL,
        error: error.message,
      });
    }
  };
};

import Cookies from "js-cookie";
import {
    REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS, GET_USER_SUCCESS, GET_USER_FAIL,
    CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL
    , CHANGE_PASSWORD_REQUEST, ADD_STORE_REQUEST,
    ADD_STORE_SUCCESS, ADD_STORE_FAIL
} from "./types";

//GET TOKEN FROM COOKIES
const getBearerToken = () => {
    const token = Cookies.get(`token`)
    return token
}
// Using async await
export const register = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:1997/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        user: data.user,
                        msg: data.msg
                    }
                })
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.message,
            });
            throw error;
        }
    }
}
//Login action
export const LoginAction = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:1997/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',

                },
                body: JSON.stringify(userData)
            })
            if (response.ok) {
                const data = await response.json()
                const { userName, token, creationDate, email, verified, gender } = data
                // return data
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        userName,
                        token,
                        msg: data.msg
                    }
                })
                localStorage.setItem('userData', JSON.stringify({ userName, creationDate, email, verified, gender }));
                return data
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error)
            }
        }
        catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.message
            })
        }
    }
}
//LOGOUT
export const logoutAction = () => {
    return async (dispatch) => {
        console.log(`logout clicked`);
        try {
            Cookies.remove(`token`, { path: `/` })
            dispatch({
                type: LOGOUT_SUCCESS,
                // payload:data.msg
            })
            localStorage.removeItem(`userData`)
        } catch (error) {
            console.log(error)
        }
    }
}
//userData
export const userData = (userName) => {
    return async (dispatch, getState) => {
        const loggedIn = getState().user.loggedIn;
        if (loggedIn) {
            try {
                const token = getBearerToken()
                const response = await fetch(`http://localhost:1997/api/getUser/${userName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error(`This userName does not exist in our database!`)
                }
                const user = await response.json();
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: user,
                })
            } catch (error) {
                console.log(error)
                dispatch({
                    type: GET_USER_FAIL,
                    payload: error.message
                })
            }
        }
    }
}
//changePassword
export const ChangePassword = (oldPassword, newPassword, userName, confirmPassword) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_PASSWORD_REQUEST })
        try {
            const response = await fetch(`http://localhost:1997/api/changePassword/${userName}`, {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json`,
                },
                body: JSON.stringify({
                    confirmPassword,
                    oldPassword,
                    newPassword
                })
            })
            const data = await response.json()
            if (response.ok) {
                console.log(`itsokay`);
                dispatch({
                    type: CHANGE_PASSWORD_SUCCESS,
                    payload: data.msg
                })
            } else {
                console.log(`its not okay`);
                throw new Error(data.error)
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: CHANGE_PASSWORD_FAIL, payload: error.message })
        }
    }
}

//ADD Store to MB
export const addStore = (formData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_STORE_REQUEST });
        try {
            const response = await fetch('http://localhost:1997/api/stores', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    formData
                })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                dispatch({
                    type: ADD_STORE_SUCCESS,
                    payload: data.msg,
                });
            } else {
                dispatch({
                    type: ADD_STORE_FAIL,
                    payload: data.error,
                });
            }
        } catch (error) {
            dispatch({
                type: ADD_STORE_FAIL,
                payload: error.message,
            });
        }
    };
};

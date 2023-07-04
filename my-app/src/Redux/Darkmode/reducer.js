import { SET_DARK_MODE } from "./types";
import Cookies from "js-cookie";
const storedTheme = Cookies.get('selectedTheme');
const initialState = {
  isDarkMode: storedTheme === "dark",
};

const darkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkReducer;

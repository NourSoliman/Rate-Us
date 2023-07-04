import { SET_DARK_MODE } from "./types";

export const setDarkMode = (isDarkMode) => {
  return {
    type: SET_DARK_MODE,
    payload: isDarkMode,
  };
};
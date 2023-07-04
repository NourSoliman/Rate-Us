
import React, { useEffect } from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import "./Dark.css";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../Redux/Darkmode/action";
const DarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.dark.isDarkMode);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    dispatch(setDarkMode(newTheme));
    localStorage.setItem("selectedTheme", newTheme ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    const theme = storedTheme === "dark";
    dispatch(setDarkMode(theme));
    document.documentElement.setAttribute("data-theme", theme ? "dark" : "light");
  }, []);

  return (
    <div>
      <button
        className={`toggle-switch ${isDarkMode ? "dark" : "light"}`}
        onClick={toggleTheme}
      >
        <div className="toggle-slider">
          {isDarkMode ? (
            <RiMoonLine className="toggle-moon" />
          ) : (
            <RiSunLine className="toggle-sun" />
          )}
        </div>
      </button>
    </div>
  );
};

export default DarkMode;
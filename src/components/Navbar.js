import React, { useState } from "react";
import { setMode, setLogout } from "../state/index.js";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar({userId}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const navigate = useNavigate();
  const noMobScreen = useMediaQuery("(min-width:1000px)");
  const fullName = `${user.firstName} ${user.lastName}`;
  const [isOpen, setIsOen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-grey-0 dark:bg-grey-800 px-[6%] py-2 sticky  top-0 z-50">
      <div className="flex justify-between items-center">
        <div
          className="text-2xl font-bold mr-5 text-primary-500 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Social App
        </div>
        {noMobScreen && (
          <div className="dark:bg-grey-600 bg-grey-10 px-2 py-0.5 rounded-lg">
            <input
              className="dark:bg-grey-600 bg-grey-10 focus:outline-none"
              placeholder="Search..."
            />
            <SearchIcon className="cursor-pointer" />
          </div>
        )}
      </div>

      {noMobScreen ? (
        <div className="flex gap-5 items-center">
          <button
            onClick={() => dispatch(setMode())}
            className="cursor-pointer"
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </button>

          <MessageIcon className="cursor-pointer" />
          <NotificationsIcon className="cursor-pointer" />
          <HelpIcon className="cursor-pointer" />
          <ExitToAppIcon
            className="cursor-pointer"
            onClick={() => dispatch(setLogout())}
          />
          <div className="font-semibold text-xl">{fullName}</div>
        </div>
      ) : (
        <div className="flex gap-5">
          <button
            value={isOpen}
            onClick={() => setIsOen(!isOpen)}
            className="cursor-pointer"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      )}
      {isOpen && !noMobScreen && (
        <div className="absolute top-12 right-0  w-[50%] bg-grey-100 dark:bg-grey-700 p-2 z-10">
          <div className="flex flex-col gap-5 items-center">
            <button
              onClick={() => dispatch(setMode())}
              className="cursor-pointer"
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
            <MessageIcon className="cursor-pointer" />
            <NotificationsIcon className="cursor-pointer" />
            <HelpIcon className="cursor-pointer" />
            <ExitToAppIcon
              className="cursor-pointer"
              onClick={() => dispatch(setLogout())}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

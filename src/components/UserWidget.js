import React from "react";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import UserImage from "./UserImg.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

function UserWidget({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(
      `https://social-server-tau.vercel.app/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <div className="dark:bg-grey-800 bg-white p-5 rounded-xl text-sm">
      <div className="flex justify-between items-center  ">
        <div className="flex justify-between items-center gap-2">
          <div onClick={() => navigate(`/profile/${userId}`)}>
            <UserImage image={picturePath} />
          </div>
          <div>
            <div className="font-bold text-base">
              {firstName} {lastName}
            </div>
            <p>{friends ? `${friends.length} friends` : "0 friends"}</p>{" "}
          </div>
        </div>
        <PermIdentityIcon className="cursor-pointer" />
      </div>
      <hr className="my-3" />
      <div className="flex gap-5 items-center ">
        <EditLocationAltIcon />
        <p>{location}</p>
      </div>

      <div className="flex gap-5 items-center mt-3">
        <WorkOutlineOutlinedIcon />
        <p>{occupation}</p>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between items-center ">
        <p>who viewed yoyr profile</p>
        <div>{viewedProfile} </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p>Impressions of your post</p>
        <div>{impressions} </div>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between items-center  ">
        <div className="flex justify-between items-center gap-2">
          <div>
            <img src={twitter} alt="" />
          </div>
          <div>
            <div className="font-semibold">Twitter</div>
            <p>Social Network</p>
          </div>
        </div>
        <ModeEditOutlineIcon />
      </div>

      <div className="flex justify-between items-center mt-3 ">
        <div className="flex justify-between items-center gap-2">
          <div>
            <img src={linkedin} alt="" />
          </div>
          <div>
            <div className="font-semibold">Linkedin</div>
            <p>Network platform</p>
          </div>
        </div>
        <ModeEditOutlineIcon />
      </div>
    </div>
  );
}

export default UserWidget;

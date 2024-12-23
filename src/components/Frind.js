import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import UserImg from "./UserImg";

function Frind({ friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id  } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || [];

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://social-server-tau.vercel.app/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <UserImg image={userPicturePath} />
        <div>
          <p>{name} </p>
          <p className="text-sm text-grey-200">{subtitle}</p>
        </div>
      </div>
      {_id !== friendId && (
        <button
          onClick={patchFriend}
          className="dark:bg-grey-600 bg-grey-50 py-1 px-4 rounded-lg dark:text-white text-grey-800 font-medium"
        >
          {isFriend ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}

export default Frind;

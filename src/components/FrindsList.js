import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import Frind from "./Frind";

function FrindsList({ userId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) ;

  const getFriends = async () => {
    const response = await fetch(
      `https://social-server-tau.vercel.app/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="dark:bg-grey-800 bg-white p-5 rounded-xl text-sm mt-5">
      <p className="mb-5 font-semibold text-lg">Friends List</p>
      <div className="flex flex-col gap-5">
        {friends.map((friend) => (
          <Frind
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </div>
  );
}

export default FrindsList;

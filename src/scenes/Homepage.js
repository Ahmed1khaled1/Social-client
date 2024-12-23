import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import { useSelector, useDispatch } from "react-redux";
import SharePost from "components/SharePost";
import PostsFild from "components/PostsFild";
import Add from "components/Add";
import FrindsList from "components/FrindsList";
import { setFriends } from "state";

function Homepage() {
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getFriends = async () => {
    const response = await fetch(
      `https://social-server-tau.vercel.app/users/${_id}/friends`,
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
  }, [_id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />
      <div className="lg:flex block px-[6%] py-5 w-[100%] gap-6">
        <div className="lg:basis-1/4">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="lg:basis-2/5 mt-10 lg:mt-0">
          <SharePost picturePath={picturePath} />
          <PostsFild userId={_id} />
        </div>
        <div className="hidden lg:block lg:basis-1/4">
          <Add />
          <FrindsList userId={_id} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

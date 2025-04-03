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
      <div className="md:flex block py-5 max-w-[90%] gap-6 mx-auto">
        <div className="lg:w-1/4 md:w-1/3 mb-5">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="lg:w-2/4 md:w-2/3 lg:mt-0">
          <SharePost picturePath={picturePath} />
          <PostsFild userId={_id} />
        </div>
        <div className="hidden lg:block lg:w-1/4">
          <Add />
          <FrindsList userId={_id} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

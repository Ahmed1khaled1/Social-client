import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import { useSelector } from "react-redux";
import SharePost from "components/SharePost";
import PostsFild from "components/PostsFild";
import FrindsList from "components/FrindsList";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
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

    if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="lg:flex block justify-center px-[6%] py-5 w-[100%] gap-6">
        <div className="lg:basis-1/4">
          {user && (
            <UserWidget userId={userId } picturePath={user.picturePath} />
          )}
          <FrindsList userId={userId} />
        </div>
        <div className="lg:basis-2/5 mt-10 lg:mt-0">
          <SharePost picturePath={user.picturePath} />
          <PostsFild userId={userId } isProfile />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

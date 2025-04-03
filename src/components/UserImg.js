import React from "react";

const UserImg = ({ image }) => {
  return (
    <img
      src={image}
      alt="User"
      className="min-w-10 h-10 rounded-full object-cover"
    />
  );
};

export default UserImg;

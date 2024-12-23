import React from 'react'

function UserImg({image}) {
    
  return (
    <img
      src={`https://social-server-tau.vercel.app/assets/${image}`}
      alt=""
      className="w-10 h-10 rounded-full object-cover cursor-pointer"
    />
  );
}

export default UserImg
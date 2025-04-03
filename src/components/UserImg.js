import React from 'react'

function UserImg({image}) {
    
  return (
    <img
      src={`${image}`}
      alt=""
      className="w-10 h-10 rounded-full object-cover cursor-pointer"
    />
  );
}

export default UserImg
import React from 'react'

function Add() {
  return (
    <div className="dark:bg-grey-800 bg-white p-5 rounded-xl text-sm">
      <div className="flex justify-between items-center p-2 rounded-lg text-gray-200">
        <div>Sponsored</div>
        <div>Create Ad</div>
      </div>
      <img
        src="https://social-server-tau.vercel.app/assets/info4.jpeg"
        alt=""
        className="my-5 rounded-lg"
      />
      <div className="text-sm flex justify-between items-center">
        <div>MikaCosmetics</div>
        <div>mikacosmetics.com</div>
      </div>
      <div className="text-grey-200">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </div>
    </div>
  );
}

export default Add
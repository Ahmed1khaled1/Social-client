import React from "react";
import Form from "./Form.js";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="pb-5">
      <div className="bg-grey-0 dark:bg-grey-800 flex justify-center py-2 h-12 text-center">
        <div
          className="text-2xl font-bold  text-primary-500 cursor-pointer mx-auto"
          onClick={() => navigate("/home")}
        >
          Social App
        </div>
      </div>
      <div className="md:w-[50%] w-[96%] p-5 mx-auto mt-5  rounded-xl dark:bg-grey-800 bg-grey-0">
        <div className="mb-5">
          Welcome to Social App, the Social Media for Sociopaths!
        </div>
        <Form />
      </div>
    </div>
  );
}

export default LoginPage;

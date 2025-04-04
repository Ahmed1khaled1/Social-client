import React from "react";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initialValuesLogin = {
  email: "",
  password: "",
};

function Form() {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

const register = async (values, onSubmitProps) => {
  // this allows us to send form info with image
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picture.name);

  const savedUserResponse = await fetch(
    "https://social-server-tau.vercel.app/auth/register",
    {
      method: "POST",
      body: formData,
    }
  );
  const savedUser = await savedUserResponse.json();
  onSubmitProps.resetForm();

  if (savedUser) {
    setPageType("login");
  }
};

const login = async (values, onSubmitProps) => {
  const loggedInResponse = await fetch(
    "https://social-server-tau.vercel.app/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const loggedIn = await loggedInResponse.json();
  onSubmitProps.resetForm();
  if (loggedIn) {
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate("/home");
  }
};

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-5  ">
          {isRegister && (
            <>
              <input
                placeholder="First Name"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                autoComplete="given-name"
                className="col-span-4 md:col-span-2 cursor-pointer p-2 rounded-md dark:bg-grey-800 border border-grey-300"
              />
              <input
                placeholder="Last Name"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                autoComplete="family-name"
                className="col-span-4 md:col-span-2 p-2 cursor-pointer rounded-md dark:bg-grey-800 border border-grey-300"
              />
              <input
                placeholder="Location"
                label="Location "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                autoComplete="address-level2"
                className="col-span-4 p-2 rounded-md cursor-pointer dark:bg-grey-800 border border-grey-300"
              />
              <input
                placeholder="Occupation"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                autoComplete="organization-title"
                className="col-span-4 p-2 rounded-md cursor-pointer dark:bg-grey-800 border border-grey-300"
              />
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className="col-span-4 p-2 rounded-md cursor-pointer dark:bg-grey-800 border border-grey-300"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p className="text-grey-300">Add Picture Here</p>
                    ) : (
                      <div className="flex justify-between items-center">
                        {values.picture.name}
                        <EditOutlinedIcon />
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </>
          )}
          <input
            placeholder="Email"
            label="Email "
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            autoComplete="email"
            className="col-span-4 p-2 rounded-md cursor-pointer dark:bg-grey-800 border border-grey-300"
          />
          <input
            placeholder="Password"
            type="password"
            label="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            autoComplete="current-password"
            className="col-span-4 p-2 rounded-md cursor-pointer dark:bg-grey-800 border border-grey-300"
          />
          <button
            type="submit"
            className="p-2 bg-primary-500 text-white rounded-md col-span-4 cursor-pointer  w-full "
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>
          <p
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            className=" col-span-4 hover:text-primary-500 cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </p>
        </form>
      )}
    </Formik>
  );
}

export default Form;

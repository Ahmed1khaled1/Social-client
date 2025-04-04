// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/Homepage";
import LoginPage from "./scenes/login/LoginPage";
import ProfilePage from "./scenes/ProfilePage";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="bg-grey-10 dark:bg-grey-900 min-h-screen text-grey-900 dark:text-grey-0">
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

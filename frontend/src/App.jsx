import React, { useState } from "react";
import "./App.css";
import LeftPart from "./home/leftPart/LeftPart";
import RightPart from "./home/rightPart/RightPart";
import Signup from "./controller/Signup";
import Login from "./controller/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/authContext";
import UserProfile from "./controller/UserProfile";
import CallSystem from "./controller/callSystem/CallSystem";

function App() {
  const { isLogged } = useAuth();
const [showMd, setShowMd ] = useState(false);
// console.log(showMd)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLogged ? (
              <div className="flex h-screen">
                <LeftPart   showMd={showMd} setShowMd={setShowMd}/>
                <RightPart  showMd={showMd} setShowMd={setShowMd}/>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/" /> : <Login />}
        />
          <Route
          path="/call"
          element={ <CallSystem />}
        />
         <Route
          path="/profile"
          element={<UserProfile/>}
        />
        <Route
          path="/signup"
          element={isLogged ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </>
  );
}

export default App;

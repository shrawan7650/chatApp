import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../../context/authContext";
import { NavLink } from "react-router-dom";
const Logout = () => {
  const { logout ,getProfile} = useAuth();

  return (
    <>
      <div className=" h-[10vh] bg-transparent flex items-center">
        <div>
          <IoMdLogOut
            onClick={() => logout()}
            className="text-5xl text-white hover:bg-slate-700 duration-300 rotate-180 cursor-pointer rounded-full p-2 ml-2 mt-1"
          />
        </div>
        <div>
       <NavLink to="/profile"> <CgProfile  onClick={()=>getProfile()}  className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1" /></NavLink>
        </div>
      </div>
    </>
  );
};

export default Logout;

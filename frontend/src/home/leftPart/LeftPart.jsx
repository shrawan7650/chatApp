import React from "react";
import Search from "./components/Search";
import Logout from "./components/Logout";
import Users from "./components/Users";

// eslint-disable-next-line react/prop-types
const LeftPart = ({ showMd ,setShowMd}) => {
  return (
    <>
      {/* // laptop */}
      <div className="w-[30%] hidden md:block z-50 bg-black text-gray-300">
        <Search />
        <div
          className="overflow-y-auto"
          style={{ minHeight: "calc(84vh - 10vh)" }}
        >
          <Users />
        </div>
        <Logout />
      </div>
      {/* //mobile */}
      <div
        className={`transform md:w-[30%] w-[90%] fixed md:relative md:hidden md:translate-x-0 transition-transform duration-300 ${
          showMd ? "translate-x-0" : "-translate-x-full"
        } bg-slate-900 text-white h-full flex flex-col gap-1 z-30`}
      >
        <Search />
        <Users showMd={showMd} setShowMd={setShowMd} />
        <Logout />
       
      </div>
    </>
  );
};

export default LeftPart;

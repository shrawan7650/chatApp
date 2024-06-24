import React from "react";
import User from "./User";
import useGetAllUser from "../../../context/useGetAllUser";
import Spinner from "../../../Spinner/Spinner";

const Users = () => {

const[alluser,loader] = useGetAllUser();
// console.log(alluser,loader)
if (loader) {
  return <Spinner />;
}
  return (
    <div>
    <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
      Messages
    </h1>

    <p  className="   loading-ring animate-spin"></p>
    <div
      className="py-2 flex-1 s overflow-y-auto"
      style={{ maxHeight: "calc(84vh - 10vh)" }}
    >
   {alluser?.map((user, index) => (
          <User key={index} user={user} loader={loader} />
        ))}
    </div>
  </div>
  );
};

export default Users;

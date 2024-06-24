//get all user from backend

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./authContext";

const useGetAllUser = () => {
  const [alluser, setAllUser] = useState([]);
  const { token, loader, setLoader } = useAuth();
  // console.log(loader)
  useEffect(() => {
    const getAllUser = async () => {
      if (token) {
        setLoader(true);
        await axios
          .get("api/user/alluser", {
            headers: {
              Authorization: token,
              webCredential: true,
            },
          })
          .then((response) => {
            // console.log(response)
            setLoader(false);
            setAllUser(response.data.users);
          })
          .catch((error) => {
            console.log(error);
            setLoader(true);
            setAllUser(null);
          });
      }
    };
    getAllUser();
  }, []);

  return [alluser, loader];
};

export default useGetAllUser;

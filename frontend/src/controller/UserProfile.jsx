import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { CgArrowLeft, CgBackspace } from 'react-icons/cg';
import { FaBackward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { isLogged, usersData, loader } = useAuth();

 
  return (
    <>
   <Link to="/">   <h1 className='ml-8 mt-10'><CgArrowLeft className=' text-3xl'/></h1></Link>
    <div className=' flex justify-center h-screen items-center'>
      {loader && <p>Loading...</p>}
      {isLogged ? (
        <div className='border p-5 rounded-md'>
          <p>User Profile:</p>
          <p>Name: {usersData ? usersData?.name : 'Loading...'}</p>
          <p>Email: {usersData ? usersData?.email : 'Loading...'}</p>
          <p>Created At: {usersData ? new Date(usersData?.createdAt).toLocaleString() : 'Loading...'}</p>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div></>
  );
};

export default UserProfile;

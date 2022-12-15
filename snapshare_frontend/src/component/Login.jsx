import React from "react";
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from '../assets/snapshare.svg';
import {client} from '../client';

const Login = () => {
  const navigate = useNavigate(); //useNavigate is a hook used to directly navigate our page on click

  // responseGoogle method is passed in googleLogin button 
  // response props is the user id info which we have to store
  const responseGoogle = (response) => {
    console.log("google logged in successfull", response);
    // store the user info in local storage 
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    // const { name, googleId, imageUrl } = response.profileObj;
    const name = response.profileObj.name;
    const googleId = response.profileObj.googleId;
    const imageUrl = response.profileObj.imageUrl;
    if(localStorage.getItem(name)){
      console.log( localStorage.getItem(name) +" successfully store in local ");
    }

    // create a doc to store in sanity database
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    // client is a different js file used to connect frontend with backend
    client.createIfNotExists(doc).then(() => {
      console.log("creating dataset in sanity");
      // after successfully saving the user data, redirect to main home page.
      navigate('/', { replace: true });
      console.log("navitage from login to home page successfully");
    });
  };

  const responseGoogleFail = (err) =>{
    console.log("error response google fail", err);
  }

  return (
    // parent div
    <div className="felx justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* background video */}
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover" // width full height full 
        />
        {/* div for login button and title image logo */}
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          {/* top image logo */}
          <div className="p-5">
            <img src={logo} referrerPolicy="no-referrer" width="130px" alt="logo" />
          </div>

          {/* now creating google login button wiht client id */}
          <div className="shadow-2xl">
            {/* googleLogin button imported */}
            <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN} // process.env is used to get .env file data
            render={(renderProps) => (
              <button 
              type="button" 
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none" >
                {/* a small google logo */}
                <FcGoogle className="mr-3" /> Sign in with Google
              </button>
            )}  
            onSuccess={responseGoogle}
            onFailure={responseGoogleFail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

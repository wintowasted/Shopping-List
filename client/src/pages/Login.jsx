import React, { useState, useRef, useEffect } from "react";
import loginImage from "../assets/loginImage.jpg";
import {login} from '../api/axios'
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  //const location = useLocation();
  
  const userNameRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [userName, password]);

  const checkLogin = async (e) => {
    e.preventDefault();

    try {
   
      const response = await login({userName, password});
    
      const accessToken = response?.data?.token;
      const userId = response?.data?.userId;  // ************** Change maybe? ******************

      setAuth({ userName, password, accessToken, userId });

      // Clear all inputs
      setUserName("");
      setPassword("");

    //   navigate(from, { replace: true });
      navigate('/');
    } catch (error) {
      error?.request?.status === 0
        ? setErrorMessage("Server is not available. Try again later.")
        : setErrorMessage(error?.response?.data.errors);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden  sm:block  overflow-hidden ">
        <img
          className="w-full h-full object-cover"
          src={loginImage}
          alt="login-img"
        />
      </div>
      <div className="bg-gray-400 flex flex-col justify-center">
        {/* Form */}
        <form
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 rounded-lg"
          onSubmit={checkLogin}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN IN
          </h2>

          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="username">User Name</label>
            <input
              required
              id="username"
              ref={userNameRef}
              autoComplete="off"
              value={userName}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              value={password}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          <span
            ref={errRef}
            className={
              errorMessage ? "text-red-600 text-lg text-center" : "hidden"
            }
          >
            {errorMessage}
          </span>

          <button className="w-full bg-teal-500 my-5 py-2 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Sign In
          </button>

          <p className="text-white text-md px-1">
            <span>
              {" "}
              Do you not have an account? <br />
              <Link className="underline" to={"/register"}>
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

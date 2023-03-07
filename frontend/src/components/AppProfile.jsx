import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppLogout } from "./AppLogout";

export function AppProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hideSignUp, sethideSignUp] = useState(false);
  const [userName, setUserName] = useState(null);

  async function verifyLogin(event) {
    console.log("verifying");

    try {
      const response = await axios.post(
        "http://localhost:8080/login/verify",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("User is logged in as: " + response.data.userID);
        console.log("User is logged in as: " + response.data.userName);

        setIsLoggedIn(true);
        setUserName(response.data.userName);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Not logged in");
        setIsLoggedIn(false);
      } else {
        console.error(error);
      }
    }
  }

  const verifyUrl = () => {
    if (window.location.pathname === "/login") {
      sethideSignUp(true);
    } else {
      sethideSignUp(false);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  useEffect(() => {
    verifyUrl();
  }, []);

  if (isLoggedIn) {
    return (
      <div className="AppProfile text-center">
        <Link to={"/profile"}>
          <h1 className=" hover:font-bold">{userName}</h1>
        </Link>
        <AppLogout />
      </div>
    );
  } else {
    if (hideSignUp === true) {
      console.log(window.location.pathname);
      return null;
    } else {
      return (
        <div className="AppProfile">
          <h1>
            <a href="/login">Sign up</a>
          </h1>
        </div>
      );
    }
  }
}

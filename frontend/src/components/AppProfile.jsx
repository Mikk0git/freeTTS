import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppLogout } from "./AppLogout";

export function AppProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        setIsLoggedIn(true);
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

  useEffect(() => {
    verifyLogin();
  }, []);

  if (isLoggedIn) {
    return (
      <div className="AppProfile">
        <h1>Profile</h1>
        <AppLogout />
      </div>
    );
  } else {
    return (
      <div className="AppProfile">
        <h1>
          <Link to={"/login"}>Sign up</Link>
        </h1>
      </div>
    );
  }
}

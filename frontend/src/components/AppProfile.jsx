import { useState } from "react";
import React from "react";
import { AppLogout } from "./AppLogout";

export function AppProfile({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const verifyLogin = async (event) => {
    event.preventDefault();
    console.log("verifi");

    try {
      const response = await axios.post(
        "http://localhost:8080/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("logged out");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="AppProfile">
      <h1>Profile</h1>
      <AppLogout />
    </div>
  );
}

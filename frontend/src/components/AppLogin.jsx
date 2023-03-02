import React, { useState } from "react";
import axios from "axios";

export function AppLogin() {
  const [showRegister, setShowRegister] = useState(true);

  const changeToLogin = () => {
    setShowRegister(false);
    console.log("SH= " + showRegister);
  };

  const changeToRegister = () => {
    setShowRegister(true);
    console.log("SH= " + showRegister);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log("login");
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const pass = formData.get("password");
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email,
          pass,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("logged in");
        //window.location.reload();
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    console.log("register");
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const pass = formData.get("password");
    const name = formData.get("name");
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
          name,
          email,
          pass,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("registered");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (showRegister === true) {
    return (
      <div className="AppRegister">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmitRegister} className="text-black">
          <input type="text" name="name" placeholder="Name" />
          <br />
          <input type="email" name="email" placeholder="Email" />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <button>Register</button>
        </form>
        <button onClick={changeToLogin}>Already have an account?</button>
      </div>
    );
  } else {
    return (
      <div className="AppLogin">
        <h2>Sign in</h2>
        <form className="text-black" onSubmit={handleSubmitLogin}>
          <input type="email" name="email" placeholder="Email" />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <button onClick={changeToRegister}>Don't have an account?</button>
      </div>
    );
  }
}

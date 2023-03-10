import React, { useState } from "react";
import axios from "axios";

export function AppLogin() {
  const [showRegister, setShowRegister] = useState(true);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

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
      if (response.status === 200) {
        console.log("logged in");
        //window.location.reload();
        window.location.href = "/";
      }
    } catch (error) {
      console.log("invalid email or password");
      setInvalidCredentials(true);
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
      <div className="AppLogin AppRegisterForm flex justify-center m-[1.5rem]">
        <br />
        <form onSubmit={handleSubmitRegister}>
          <h2 className="mb-[0.5rem]">Sign up</h2>
          <input type="text" name="name" placeholder="Name" />
          <br />
          <input type="email" name="email" placeholder="Email" />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <br />
          <button>Register</button>
          <br />
          <button onClick={changeToLogin}>Already have an account?</button>{" "}
        </form>
      </div>
    );
  } else {
    return (
      <div className="AppLogin AppLoginForm flex justify-center m-[1.5rem]">
        <br />
        <form onSubmit={handleSubmitLogin}>
          <h2 className="mb-[0.5rem]">Sign in</h2>

          <input type="email" name="email" placeholder="Email" />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <br />
          <button type="submit">Login</button>
          <br />
          <button onClick={changeToRegister}>Don't have an account?</button>
          <AppInvalidCredentials invalidCredentials={invalidCredentials} />
        </form>
      </div>
    );
  }
}

function AppInvalidCredentials({ invalidCredentials }) {
  if (invalidCredentials) {
    return (
      <p className=" text-red-600 mt-1 font-bold ">Invalid email or password</p>
    );
  } else {
    return null;
  }
}

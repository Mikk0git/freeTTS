import React from "react";
import axios from "axios";

export function AppLogout() {
  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logout");

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
        window.location.reload();
        //window.location.href = "/";
        console.log("logged out");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="AppLogout">
      <form onSubmit={handleLogout}>
        <button type="submit" className=" hover:font-bold">
          Logout
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";

export function AppCookie({}) {
  const showCookie = () => {
    const userIDvalue = document.cookie.indexOf("userID");
    if (userIDvalue !== -1) {
      console.log("ID: " + userIDvalue);
      return null;
    } else {
      console.log("ldoas");
      return (
        <div className="App-cookie">
          <button
            onClick={addCookie}
            className="cookieBtn border-2 p-1 border-slate-600 border-solid rounded-sm"
          >
            Cookie
          </button>
        </div>
      );
    }
  };

  const addCookie = () => {
    document.cookie =
      "userID=1; SameSite=None; Secure; expires=" +
      new Date(Date.now() + 86400000).toUTCString() +
      "; path=/";
    showCookie();
  };
  return showCookie();
}

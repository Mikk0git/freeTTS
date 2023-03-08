import React, { useState } from "react";

export function AppCookie({}) {
  const [cookieConcentState, setCookieConcentState] = useState(false);

  const giveConcent = (event) => {
    event.preventDefault();
    localStorage.setItem("cookieConcent", true);
    setCookieConcentState(true);
  };

  if (!localStorage.getItem("cookieConcent") && !cookieConcentState) {
    return (
      <div className="AppCookie fixed inset-0 z-50 bg-[rgba(0,0,0,0.8)] flex flex-col justify-center items-center text-center">
        <p className="font-bold mr-6 ml-6">
          We use cookies on this website to improve Your browsing experience, we
          do not use them to track You.
        </p>
        <div className="flex flex-row">
          <form onSubmit={giveConcent}>
            {" "}
            <button className="m-4" type="submit">
              Accept
            </button>
          </form>
          <button className="m-4">Learn more</button>
          {/* Dodać link do learnMore */}
        </div>
      </div>
    );
  }
}

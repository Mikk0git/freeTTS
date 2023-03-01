import { AppLogout } from "./components/AppLogout";
import { AppLogin } from "./components/AppLogin";
import { AppCookie } from "./components/AppCookie";
import { AppForm } from "./components/AppForm";
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="App-navbar">
        <h1 className="text-center font-bold ">freeTTS</h1>
      </nav>
      <AppForm />
      {/* <AppCookie /> */}
      <AppLogin />
      <AppLogout />
    </div>
  );
}

export default App;

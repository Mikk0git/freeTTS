import React from "react";
export function AppLogin({}) {
  return (
    <div className="AppLogin">
      <h2>Sign in</h2>
      <form>
        <input type="email" name="email" id="" placeholder="Email" />

        <br />
        <input type="password" name="password" id="" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
  return (
    <div className="AppRegister">
      <h2>Sign up</h2>
      <form>
        <input type="text" name="name" id="" placeholder="name" />
        <br />
        <input type="email" name="email" id="" placeholder="Email" />
        <br />
        <input type="password" name="password" id="" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

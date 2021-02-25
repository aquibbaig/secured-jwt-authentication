import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const links = (
    <div>
      <Link to="/">Home</Link><br/>
      <Link to="/login">Login</Link><br/>
      <Link to="/signup">Signup</Link><br/><br/>
    </div>
  );
  return (
    <div>
      {links}
      Login
    </div>
  )
}
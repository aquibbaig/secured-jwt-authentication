import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";

export const Login = ({ history }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const links = (
    <div>
      <Link to="/">Home</Link><br/>
      <Link to="/login">Login</Link><br/>
      <Link to="/signup">Signup</Link><br/><br/>
    </div>
  );
  const [login] = useLoginMutation();
  return (
    <div>
      {links}
      <form onSubmit={async e => {
        e.preventDefault();
        const response = await login({
          variables: {
            email,
            password
          }
        });
        console.log(response);
        history.push('/');
      }}>
        <input value={email} placeholder='Enter email' type="text" onChange={e => setEmail(e.target.value)}/><br/>
        <input value={password} placeholder='Enter pwd' type="password" onChange={e => setPassword(e.target.value)}/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
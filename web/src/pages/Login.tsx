import React, { useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { setToken } from "../accessToken";
import { links } from "./Home";

export const Login = ({ history }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

        if (response && response.data) {
          setToken(response.data.login.accessToken);
        }
        history.push('/');
      }}>
        <input value={email} placeholder='Enter email' type="text" onChange={e => setEmail(e.target.value)}/><br/>
        <input value={password} placeholder='Enter pwd' type="password" onChange={e => setPassword(e.target.value)}/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
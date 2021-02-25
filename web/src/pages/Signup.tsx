import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { links } from "./Home";

export const Signup = ({ history }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  return (
    <div>
      {links}
      <form onSubmit={async e => {
        e.preventDefault();
        const response = await register({
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

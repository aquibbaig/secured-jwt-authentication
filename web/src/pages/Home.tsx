import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../generated/graphql';

export const Home = () => {
  const {data, loading} = useGetUsersQuery()
  const links = (
    <div>
      <Link to="/">Home</Link><br/>
      <Link to="/login">Login</Link><br/>
      <Link to="/signup">Signup</Link><br/><br/>
    </div>
  );
  if (!data || loading) {
    return (<div>{links}loading...<br/></div>)
  }
  return <div>
    {links}
    {data.users.map(x => {
      return (
        <li key={x.id}>
          {x.email}, {x.id}
        </li>
      )
    })}
  </div>
};

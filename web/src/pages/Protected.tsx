import React from 'react';
import { useProtectedQuery } from '../generated/graphql';

export const ProtectedRoute = () => {
  const {data, loading, error} = useProtectedQuery();
  if (loading) {
    return <div>Loading protected route....please wait....</div>
  }

  if (error) {
    console.log(error);
    return <div>Some error occured</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  return <div>{data.protected}</div>
}

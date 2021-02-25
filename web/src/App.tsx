import React from "react";
import { useGetUsersQuery } from "./generated/graphql";

function App() {
  const {data, loading} = useGetUsersQuery();
  
  if (loading || !data) {
    return <>Loading...</>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default App;

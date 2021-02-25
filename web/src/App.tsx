import React from "react";
import { gql, useQuery } from "@apollo/react-hooks";

function App() {
  const {data, loading} = useQuery(gql`
    query {
      users {
        email
        id
      }
    }
  `);
  if (loading) {
    return <>Loading...</>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default App;

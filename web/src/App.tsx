import React, {useEffect, useState} from "react";
import { setToken } from "./accessToken";
import { Routes } from "./routes/Routes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'post',
      credentials: 'include',
    })
    .then(async x => {
      const {accessToken} = await x.json()
      setToken(accessToken);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <div>Loading.......</div>
  }

  return <div>
    <Routes/>
  </div>
}

export default App;

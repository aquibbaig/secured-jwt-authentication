import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>}/>
      </Switch>
    </BrowserRouter>
  );
};

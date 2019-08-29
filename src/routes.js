import React from "react";
import { Route, Switch } from "react-router-dom";
import GitHubRepositories from "pages/gitHubRepositories";


const Router = () => {
  return (
    <Switch>
       <Route exact path="/" component={GitHubRepositories}></Route>
    </Switch>
     
  );
};



export default Router;

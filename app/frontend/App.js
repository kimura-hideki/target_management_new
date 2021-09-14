// エントリポイント
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page components
import Login from "./pages/login";
import Menu from "./pages/menu";
import Users from "./pages/users";
import UserForm from "./pages/users/UserForm";
import UserAddForm from "./pages/users/UserAddForm";
import Items from "./pages/items";
import Cars from "./pages/cars";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/new" >
          <UserAddForm pageMode="new" />
        </Route>        
        <Route exact path="/users/:id" >
          <UserForm pageMode="show" />
        </Route>
        <Route exact path="/users/:id/edit" >
          <UserForm pageMode="edit" />
        </Route>
        <Route exact path="/items" component={Items} />
        <Route exact path="/cars" component={Cars} />
      </Switch>
    </BrowserRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);

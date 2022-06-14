import Movies from "./components/movies";
import "./App.css";
import NavBar from "./components/navbar";
import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Customer from './components/customer';
import Rental from './components/rentals';
import NotFound from './components/not-found';
import { Redirect } from "react-router-dom";
import MovieForm from './components/movieForm';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
      <Switch>
        <Route path="/movies/:id" component={MovieForm}/>
        <Route path="/movies" component={Movies}/>
        <Route path="/customers" component={Customer}/>
        <Route path="/rentals" component={Rental}/>
        <Route path="/not-found" component={NotFound}/>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch> 
      </main>
    </React.Fragment>
  );
}

export default App;

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customer from './components/customer';
import Rental from './components/rentals';
import NotFound from './components/not-found';
import MovieForm from './components/movieForm';
import Login from "./components/login";
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <React.Fragment>
    <ToastContainer />
      <NavBar />
      <main className="container">
      <Switch>
      <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={Login} />
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

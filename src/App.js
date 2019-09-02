import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";

// Services
import auth from "./services/authService";

// Components
import Home from "./components/home";
// import Logo from "./components/logo";
// import Users from "./components/users";
import NavBar from "./components/navBar";
import RecipeForm from "./components/recipeForm";
// import Footer from "./components/footer";

import Logout from "./components/logout";
// import Recipes from "./components/recipes";
import NotFound from "./components/notFound";
// import Countries from "./components/countries";
// import SearchBar from "./components/searchBar";
import LoginForm from "./components/loginForm";
// import RecipeForm from "./components/recipeForm";
import ProfileForm from "./components/profileForm";
import RegisterForm from "./components/registerForm";
// import TasteProfiles from "./components/tasteProfiles";
// CSS
import "./css/App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log(user);
  }
  searchRecipes = () => {
    console.log("search recipes");
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/recipe" component={RecipeForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/profile" component={ProfileForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/" exact component={Home} />
            <Redirect from="/home" to="/" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

/*
            <Route path="/logOut" component={LogOut} />
            <Route path="/recipes/:id" component={RecipeForm} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/profiles/:id" component={ProfileForm} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/taste-profiles" component={TasteProfiles} />
            <Route path="/countries" component={Countries} />
*/

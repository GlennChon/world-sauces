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
import Recipes from "./components/recipes";
// import Footer from "./components/footer";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RecipeForm from "./components/recipeForm";
import ProfileForm from "./components/profileForm";
import RegisterForm from "./components/registerForm";
import RecipeDisplay from "./components/recipeDisplay";
import ProfileDisplay from "./components/profileDisplay";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);
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
        <header className="page-header header container-fluid"></header>
        <main className="container-fluid">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />

            <ProtectedRoute path="/recipe/edit/:id" component={RecipeForm} />
            <Route path="/recipe/:id" component={RecipeDisplay} />
            <Route path="/recipes" component={Recipes} />

            <ProtectedRoute path="/profile/edit/:id" component={ProfileForm} />
            <Route path="/profile/:username" component={ProfileDisplay} />

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

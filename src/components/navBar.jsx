import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <h2>World Sauces</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/recipes">
              <h4>Recipes</h4>
            </NavLink>

            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  <h4>Login</h4>
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  <h4>Register</h4>
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/recipe/edit/new">
                  <h4>Add Recipe</h4>
                </NavLink>
                <NavLink className="nav-item nav-link" to={"/profile/me"}>
                  <h4>{user.username}</h4>
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  <h4>Logout</h4>
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/logo.png";

function Navigation({ isLoaded }) {
  const currentUser = useSelector((state) => state.session.user);
  const profileURL = `/profile/${currentUser?.id}`;

  return (
    isLoaded && (<div>


      <div class="navbar" id="nav-container">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>

        <div class="nav-content">
          <div id="nav-logo-container" className="nav-flex-items">
            <div id="nav-div-1">
              {" "}
              <NavLink exact to="/" id="nav-logo">
                <img
                  src={logo}
                  alt="hands outlined in white clapping with a vibrant blue background"
                  id="nav-logo"
                />
              </NavLink>
              {/* <NavLink
                exact
                to="/spotlight"
                id="nav-spotlight"
                style={{ textDecoration: "none" }}
              >
                <h3>Spotlight</h3>
              </NavLink> */}
            </div>
          </div>
          <NavLink exact to="/" className="nav-flex-items" id="nav-title-link">
            <h1 id="nav-title" style={{ textDecoration: "none" }}>
              Applause
            </h1>
          </NavLink>
          <div id="Nav-buttons-container" className="nav-flex-items">
            <div id="nav-div-2">
              {currentUser ? (
                <>
                  <NavLink exact to={profileURL} style={{ textDecoration: "none", color: "black" }}>
                    <h3 style={{ textDecoration: "none", color: "black" }}>Profile</h3>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    exact
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    exact
                    to="/signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}

            </div>
          </div>
        </div>
      </div><ProfileButton user={currentUser} />
      </div>
    )
  );
}

export default Navigation;

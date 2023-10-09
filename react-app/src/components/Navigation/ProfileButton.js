import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { auth } from '../../firebase'
import { signOut } from "firebase/auth";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
    dispatch(logout());

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} id="nav-profile-button">
          <i className="fas fa-duotone fa-user fa-lg fa-3x"/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="profile-card">
  <div className="name-profile-card">John Doe</div>
  <div className="username-profile-card">@{user?.username}</div>
  <div className="email-profile-card">{user?.email}</div>
  <div className="account-type-profile-card">Premium Account</div>
  <button className="logout-profile-card" onClick={handleLogout}>Log Out</button>
</div>
          </>
        ) : (
          <div class="login-card">
  <div class="instruction-text">Welcome back!</div>
  <NavLink exact to='/login'>
  <button class="signin" onClick={() => [setShowMenu(false), history.push('/login')]}>Sign in</button></NavLink>
    <div class="instruction-text-mini">Don't have an Account?</div>
    <NavLink exact to='/signup'>
  <button class="create-account" onClick={() => [setShowMenu(false),history.push('/signup')]}>Create Account</button></NavLink>
</div>


        )}
      </ul>
    </>
  );
}

export default ProfileButton;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import VerifyEmail from "./components/Verify";
export const refList = [];

  function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser ]=useState(false)
  const currentUser = useSelector((state) => state.session.user)
  useEffect(() => {
    console.log(currentUser)
    if (user) {
      dispatch(authenticate(user?.email)).then(() => setTimeout(setIsLoaded(true), 2000));
    }else {
      dispatch(authenticate()).then(() => setTimeout(setIsLoaded(true), 2000));
    }

  }, [dispatch, user]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    // dispatch(authenticate(currentUser.email)).then(() => setIsLoaded(true));
  })
  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {currentUser ? <VerifyEmail /> : null}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/profile/:id'>
          <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

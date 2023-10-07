import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { authenticate } from "../../store/session";

import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { auth } from '../../firebase'
import pic1 from "./1.png";
import pic2 from "./2.png";
import pic3 from "./3.png";

import "./SignupForm.css";


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [role, setRole] = useState("Fan");

  useEffect(() => {
    function initSlideShow(slideshow) {
      var slides = document.querySelectorAll(
        `#${slideshow.id} [role="list"] .slide`
      );

      var index = 0,
        time = 3000;
      slides[index].classList.add("active");

      setInterval(() => {
        slides[index].classList.remove("active");

        index++;
        if (index === slides.length) index = 0;

        slides[index].classList.add("active");
      }, time);
    }

    var slideshows = document.querySelectorAll('[data-component="slideshow"]');
    slideshows.forEach(initSlideShow);
  }, []);

  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await dispatch(signUp(username, email, password, firstName, lastName, aboutMe, role))
        if(!response) {
           const data = await createUserWithEmailAndPassword(auth, email, password);
           sendEmailVerification(auth.currentUser)
        }


      } catch (error) {
        setErrors([error.message.split('(')[1]])
      }

    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div id="sign-up-container">
      <div id="slideshow-example" data-component="slideshow">
        <div role="list">
          <div className="slide">
            <img
              src={pic1}
              alt="an advertisement for applause using dark purple/blue with bright neon green and pink coloring"
              className="slideshow-image"
            />
          </div>
          <div className="slide">
            <img
              src={pic2}
              alt="an advertisement for applause using dark purple/blue with bright neon green and pink coloring"
              className="slideshow-image"
            />
          </div>
          <div className="slide">
            <img
              src={pic3}
              alt="an advertisement for applause using dark purple/blue with bright neon green and pink coloring"
              className="slideshow-image"
            />
          </div>
        </div>
      </div>
      {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
      <div id="sign-up-form-container">
        <h1 id="sign-up-title">Sign Up</h1>
        {Object.values(errors).map((error) => <p>{error}</p>)}
        <p id="sign-up-info">
          Please Fill Out The Following Information About Yourself...
        </p>
        <hr id="sign-up-line-break" />
        <form onSubmit={handleSubmit} id="sign-up-form">
          <div className="sign-up-form-field-container">
            <div className="sign-up-form-item">
              <label className="sign-up-form-labels">Username</label>
              <input
                className="sign-up-form-input"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="sign-up-form-item">
              <label className="sign-up-form-labels">Email </label>
              <input
                className="sign-up-form-input"
                placeholder="Email Address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="sign-up-form-field-container">
            <div className="sign-up-form-item">
              <label className="sign-up-form-labels">Password </label>
              <input
                className="sign-up-form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="sign-up-form-item">
              <label className="sign-up-form-labels">Confirm Password </label>
              <input
                className="sign-up-form-input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sign-up-form-field-container">
            <div className="sign-up-form-item">
              <label className="sign-up-form-labels">First Name</label>
              <input
                className="sign-up-form-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
              />
            </div>
            <div className="sign-up-form-item">
              <label className="sign-up-form-labels">Last Name </label>
              <input
                className="sign-up-form-input"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <hr id="sign-up-line-break-2" />
          <p id="sign-up-info2">What Is Something We Should Know About You?</p>
          <div className="sign-up-form-field-container">
            <div className="sign-up-form-item2">
              <label className="sign-up-form-labels">About Me</label>
              <textarea
                id="sign-up-form-textarea"
                placeholder="Something To Know About Me Is..."
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sign-up-form-field-container2">
            <div className="sign-up-form-item">
              <label id="sign-up-role" className="sign-up-form-labels">
                Account Type
              </label>
              <select
                name="role"
                id="sign-up-role-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="Fan">Fan</option>
                <option value="Musician">Musician</option>
                <option value="Engineer">Engineer</option>
              </select>
            </div>

            <button type="submit" id='sign-up-button'>Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { authenticate } from "../../store/session";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
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
    let newErrors = {};
    if (username.length < 1)
      newErrors.username = "Username is Required to Create an Account";
    if (username?.length > 40)
      newErrors.username = "Username Cannot Be More Than 40 Characters";
    if (password?.length < 1)
      newErrors.password = "Password is Required to Create an Account";
    if (password?.length > 40)
      newErrors.password = "Password Cannot be More Than 40 Characters";
    if (email?.length < 1)
      newErrors.email = "a Valid Email is Required to Create an Account";
    if (email?.length > 255)
      newErrors.email = "Email Cannot Be Greater Than 255 Characters";
    if (firstName?.length < 1)
      newErrors.firstName = "First Name is Required To Create an Account";
    if (lastName?.length < 1)
      newErrors.lastName = "Last Name is Required To Create an Account";
    if (aboutMe?.length < 1)
      newErrors.aboutMe =
        "A Little Bit About Yourself is Required To Make An Account";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords Must Match To Make An Account";
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000)
    if (Object.values(newErrors).length > 0) return null;
    else {
      if (password === confirmPassword) {
        try {
          const response = await dispatch(
            signUp(
              username,
              email,
              password,
              firstName,
              lastName,
              aboutMe,
              role
            )
          );
          if (!response) {
            const data = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            sendEmailVerification(auth.currentUser);
            return <Redirect to="/" />
          } else {
            let newErrors = {};
            Object.values(response).forEach((error) => {
              if(error?.includes('Email')) newErrors.email = (error.split(':')[1])
              else newErrors.username = (error.split(':')[1])
            })
            setErrors(newErrors);
            setTimeout(() => setErrors({}), 5000)
            return null;
          }
        } catch (error) {
          setErrors([error.message.split("(")[1]]);
        }
      } else {
        setErrors([
          "Confirm Password field must be the same as the Password field",
        ]);
      }
    }
  };

  return (
    <>
      <div class="container-sign-up">
        <div class="card-sign-up">
          <div id="slideshow-example" data-component="slideshow">
            <div role="list">
              <div className="slide">
                <div class="testimonial-sign-up">
                  <p>
                    "I am so impressed with the interface and the idea! Local
                    artists helping each other, How it should be!"
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Test Testerson</span>
                    <span class="occupation-sign-up">
                      Creative Designer &amp; Developer
                    </span>
                  </div>
                </div>
                <div class="testimonial-sign-up">
                  <p>
                    "What a fun place to find new music. I did not have high
                    hopes when I first logged in, but Applause has become a
                    daily part of my morning."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Mike Wazowski</span>
                    <span class="occupation-sign-up">
                      Casual Entrepeneur &amp; Socialite
                    </span>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div class="testimonial-sign-up">
                  <p>
                    "Applause has helped me discover so many great new artists.
                    I love that I can listen to their music for free and support
                    them by buying their merch."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Boo Monsters Inc.</span>
                    <span class="occupation-sign-up">Top Scarer</span>
                  </div>
                </div>
                <div class="testimonial-sign-up">
                  <p>
                    "I'm a huge fan of Applause. It's the perfect way to find
                    new music and support local artists. I highly recommend it
                    to anyone who loves music."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Sulley</span>
                    <span class="occupation-sign-up">Top Scarer</span>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div class="testimonial-sign-up">
                  <p>
                    "This website is a must-read for anyone who wants to stay
                    ahead of the curve in the tech industry."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">John Smith</span>
                    <span class="occupation-sign-up">Software Engineer</span>
                  </div>
                </div>
                <div class="testimonial-sign-up">
                  <p>
                    "I highly recommend this website to anyone who wants to
                    learn more about technology."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Mary Johnson</span>
                    <span class="occupation-sign-up">Student</span>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div class="testimonial-sign-up">
                  <p>
                    "This website is my go-to resource for learning about new
                    tech products and services. The reviews are always helpful,
                    and the articles are always informative."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">David Davis</span>
                    <span class="occupation-sign-up">Entrepreneur</span>
                  </div>
                </div>
                <div class="testimonial-sign-up">
                  <p>
                    "I love that this website covers such a wide range of tech
                    topics. There's something for everyone, whether you're a
                    tech enthusiast or just want to stay informed about the
                    latest trends."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Susan Jones</span>
                    <span class="occupation-sign-up">Marketing Manager</span>
                  </div>
                </div>
              </div>

              <div className="slide">
                <div class="testimonial-sign-up">
                  <p>
                    "Applause is a great way to discover new music. I love that
                    I can listen to songs for free and then buy them if I like
                    them."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Randall Boggs</span>
                    <span class="occupation-sign-up">Scarer</span>
                  </div>
                </div>
                <div class="testimonial-sign-up">
                  <p>
                    "Applause is a great way to support local artists. I love
                    that I can buy their merch and stream their music for free."
                  </p>
                  <div class="user-profile-picture-sign-up"></div>
                  <div class="user-sign-up">
                    <span class="username-sign-up">Roz</span>
                    <span class="occupation-sign-up">
                      Administrative Assistant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form class="login-form-sign-up" onSubmit={handleSubmit}>
            <div class="header-sign-up">
              <label class="title-sign-up">Create an Account</label>
              <p class="description-sign-up">
                Create your account in no time and enjoy the best our musical community has to offer!
              </p>
            </div>
            <div class="input_row-sign-up">
              <div class="input_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.firstName ? 'error-tooltip-sign-up' : 'hidden'}>{errors?.firstName}</span>
              </div>
                <input
                  id="first_name_field"
                  class="input_field-sign-up"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="first-name"
                  title="First Name"
                  placeholder="First Name"
                />
              </div>
              <div class="input_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.lastName ? 'error-tooltip-sign-up' : 'hidden'}>{errors?.lastName}</span>
              </div>
                <input
                  id="last_name_field"
                  class="input_field-sign-up"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="last-name"
                  title="Last Name"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="input_row-sign-up">
              <div class="input_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.username ? 'error-tooltip-sign-up' : 'hidden'}>{errors?.username}</span>
              </div>
                <input
                  id="username_field"
                  class="input_field-sign-up"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  title="Username"
                  placeholder="Username"
                />
              </div>
              <div class="input_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.email ? 'error-tooltip-sign-up' : 'hidden'}>{errors?.email}</span>
              </div>
                <input
                  id="email_field"
                  class="input_field-sign-up"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  title="Email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="input_row-sign-up">
              <div class="input_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.password ? 'error-tooltip-sign-up' : 'hidden'}>{errors?.password}</span>
              </div>
                <input
                  id="password_field"
                  class="input_field-sign-up"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  title="Password"
                  placeholder="Password"
                />

              </div>
              <div class="input_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.confirmPassword ? 'error-tooltip-sign-up' : 'hidden'}>{errors?.confirmPassword}</span>
              </div>
                <input
                  id="confirm_password_field"
                  class="input_field-sign-up"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirm-password"
                  title="Confirm Password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <p id="sign-up-info2">
              What Is Something We Should Know About You?
            </p>
            <div class="input_row-sign-up">
              <div class="input_container-sign-up textarea_container-sign-up">
              <div className='errors-sign-up'>
              <span className={errors?.aboutMe ? 'error-tooltip-sign-up' : 'hidden'} id='error-tooltip-about-me'>{errors?.aboutMe}</span>
              </div>
                <textarea
                  id="about_me_field"
                  class="input_field-sign-up"
                  name="about-me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  title="About Me"
                  placeholder="About Me"
                ></textarea>
                <select
                  id="role_field"
                  class="input_field-sign-up"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  name="role"
                >
                  <option value="Fan">Fan</option>
                  <option value="Musician">Musician</option>
                  <option value="Engineer">Engineer</option>
                </select>
              </div>
            </div>
            <button class="sign-in_btn" type="submit" title="Sign In">
              <span>Create Account</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;

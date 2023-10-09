import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";

//firebase imports

import { Redirect } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

//static asset imports

import pic1 from "./1.png";
import pic2 from "./2.png";
import pic3 from "./3.png";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    function initSlideShow(slideshow) {
      var slides = document.querySelectorAll(
        `#${slideshow.id} [role="list"] .slide`
      );

      var index = 0,
        time = 5000;
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
    if (email?.length < 1) newErrors.email = "An Email Is Required To Log In";
    if (password?.length < 1)
      newErrors.password = "A Password is Required To Log In";
    if (password?.length > 40)
      newErrors.password = "Passwords Cannot Be Greater Than 40 Characters";setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {

      setTimeout(() => setErrors({}), 5000);
      return null;
    } else {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        dispatch(authenticate(data.user.email));
      } catch (error) {
        setErrors(error);
        const errorMessage = error.message.split("(")[1];
        console.log(errorMessage.slice(0, errorMessage.length - 2));
        setErrors({ error: errorMessage.slice(5, errorMessage.length - 2) });
        setTimeout(() => setErrors({}), 5000);
      }
    }
  };

  return (
    <div id="log-in-container">
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
                "What a fun place to find new music. I did not have high hopes
                when I first logged in, but Applause has become a daily part of
                my morning."
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
                "Applause has helped me discover so many great new artists. I
                love that I can listen to their music for free and support them
                by buying their merch."
              </p>
              <div class="user-profile-picture-sign-up"></div>
              <div class="user-sign-up">
                <span class="username-sign-up">Boo Monsters Inc.</span>
                <span class="occupation-sign-up">Top Scarer</span>
              </div>
            </div>
            <div class="testimonial-sign-up">
              <p>
                "I'm a huge fan of Applause. It's the perfect way to find new
                music and support local artists. I highly recommend it to anyone
                who loves music."
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
                "This website is a must-read for anyone who wants to stay ahead
                of the curve in the tech industry."
              </p>
              <div class="user-profile-picture-sign-up"></div>
              <div class="user-sign-up">
                <span class="username-sign-up">John Smith</span>
                <span class="occupation-sign-up">Software Engineer</span>
              </div>
            </div>
            <div class="testimonial-sign-up">
              <p>
                "I highly recommend this website to anyone who wants to learn
                more about technology."
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
                "This website is my go-to resource for learning about new tech
                products and services. The reviews are always helpful, and the
                articles are always informative."
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
                topics. There's something for everyone, whether you're a tech
                enthusiast or just want to stay informed about the latest
                trends."
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
                "Applause is a great way to discover new music. I love that I
                can listen to songs for free and then buy them if I like them."
              </p>
              <div class="user-profile-picture-sign-up"></div>
              <div class="user-sign-up">
                <span class="username-sign-up">Randall Boggs</span>
                <span class="occupation-sign-up">Scarer</span>
              </div>
            </div>
            <div class="testimonial-sign-up">
              <p>
                "Applause is a great way to support local artists. I love that I
                can buy their merch and stream their music for free."
              </p>
              <div class="user-profile-picture-sign-up"></div>
              <div class="user-sign-up">
                <span class="username-sign-up">Roz</span>
                <span class="occupation-sign-up">Administrative Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="log-in-form-container">
        <form onSubmit={handleSubmit} class="container-log-in">
          <div class="card-log-in">
            <div class="login-form-log-in">
              <div class="header-log-in">
                <label class="title-log-in">Log In</label>
                <p class="description-log-in">
                  Log in to access your account to find the latest and best
                  music around.
                </p>
                <div className="errors-log-in">
                  <span
                  id='error-backend-log-in'
                    className={
                      errors?.error ? "error-tooltip-log-in" : "hidden"
                    }
                  >
                    {errors?.error}
                  </span>
                </div>
              </div>
              <div class="input_container-log-in">
                <div className="errors-log-in">
                  <span
                    className={
                      errors?.email ? "error-tooltip-log-in" : "hidden"
                    }
                  >
                    {errors?.email}
                  </span>
                </div>
                <label>Email</label>
                <input
                  id="email_field"
                  type="email"
                  name="email"
                  title="Email"
                  className="input_field-log-in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
              </div>
              <div class="input_container-log-in">
                <div className="errors-log-in">
                  <span
                    className={
                      errors?.password ? "error-tooltip-log-in" : "hidden"
                    }
                  >
                    {errors?.password}
                  </span>
                </div>
                <label>Password</label>
                <input
                  id="password_field"
                  class="input_field-log-in"
                  type="password"
                  name="password"
                  title="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button class="log-in_btn" type="submit" title="Log In">
                <span>Log In</span>
              </button>
            </div>
            <hr id="log-in-line-break" />
            <div class="mission-statement-log-in">
              <p class="statement-text-log-in">
                Here at Applause we are dedicated to one thing, the true joy
                that music brings where ever it goes. Much like many of you,
                music inspires us. It has been apart of the history of this
                world for as long as we have records. The legacy of music is
                deep in the roots of humanity, and with it comes a longing for
                an ever changing sound. It is our simple aim to be a conduit for
                the joy and inspiration that music continues to inspire across
                the generations that are soon to come, and the sounds that will
                soon come with them.
              </p>
              <hr id="log-in-line-break" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;

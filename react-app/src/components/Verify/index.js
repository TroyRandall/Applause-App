import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";

import "./verifyEmail.css";

function VerifyEmail() {
  const [authToggle, setAuthToggle] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const changeToggle = (e) => {
      setAuthToggle(true);
    };
    const close = document.getElementById("verify_close");
    if (close) {
      close.addEventListener("click", changeToggle);

      return () => close.removeEventListener("click", changeToggle);
    }
  }, [authToggle]);

  return !currentUser?.emailVerified && !authToggle ? (
    <>
      <div className="info">
        <div className="info__title">
          You Have Not Verified You're Email Yet, Please Do So to Access The
          Full Site.
        </div>
        <div className="info__close" id="verify_close"></div>
      </div>
    </>
  ) : null;
}

export default VerifyEmail;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./whoToSupport.css";
import * as allUserActions from "../../store/allUsers";

function WhoToSupport() {
  const dispatch = useDispatch();
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const supportUsers = useSelector((state) => state.allUsers);
  useEffect(() => {
    const loadUsers = async () => {
      await dispatch(allUserActions.getAllUsersThunk());
    };
    loadUsers().then(() => setUsersLoaded(true));
  }, [dispatch, toggle]);

const checkToggle = () => {
    if (toggle) {
        setTimeout(() => setToggle(false), 5000)
        return <><p id="coming-soon">Coming Soon!</p></>

    }
}

  return (
    usersLoaded && (
      <div class="user-card" id="who-to-support">
        <p class="supporter-title">Who to Support</p>

        <div class="user__container">
          {Object.values(supportUsers).map((user) => {
            return (
              <div className="user">
                <img className="supporter-image" src={user?.imageUrl}></img>
                <div className="user__content">
                  <div className="support-text">
                    <span className="supporter-name">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <p className="supporter-username">@{user?.username}</p>
                  </div>
                  <button className="support">Support</button>
                </div>
              </div>
            );
          })}
        </div>
        <div id="see-more-container">
          <p class="more" onClick={() => setToggle(true)}>
            See More...
          </p>
          {checkToggle()}
        </div>
      </div>
    )
  );
}

export default WhoToSupport;

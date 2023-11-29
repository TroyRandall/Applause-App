import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as postActions from '../../store/posts';
import { setUserProperties } from "firebase/analytics";
import './deletePost.css'

function DeletePost({ post }) {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const overlayRefDelete = useRef();
  const cancelDeleteRef = useRef();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);

  const UlClassName = "overlay-delete" + (deleteToggle ? "" : "hidden");

const handleDelete = async() => {
        const res = await dispatch(postActions.deleteApplausePostThunk(post?.id))
        if(res){
            setErrors(res);
            return errors;
        } else {
            setDeleteToggle(false);
        }
    }


const resetDeleteForm = (e) => {
    if(overlayRefDelete.current === e.target ||
        cancelDeleteRef.current === e.target)  {
            setDeleteToggle(false);
        }

}

const changeDeleteToggle = (e) => {
e.preventDefault();
setDeleteToggle(true);
}
  const checkDeleteToggle = () => {
    if (deleteToggle) {
      return (
        <div
          className={UlClassName}
          id="overlay"
          onClick={resetDeleteForm}
          ref={overlayRefDelete}
        >
          <div id="delete-post-container">
            <div class="delete-card" id='deleteCard'>
              <div class="delete-header">
                <div class="delete-image">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FncE%2F5Ek%2FncE5Ekk4i.jpg&f=1&nofb=1&ipt=1e0063bbf07203cdfb30ee4d4a0c7aac199d2fc57828c6ae24693b83f10abda1&ipo=images"
                    alt="Image"
                    class="delete-img"
                  />
                </div>
                <div class="delete-content">
                  <span class="delete-title">Delete Post</span>
                  <p class="delete-message">
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                  </p>
                </div>
                <div class="delete-actions">
                  <button type="button" class="delete-delete" onClick={handleDelete}>
                    Delete
                  </button>
                  <button type="button" class="delete-cancel" ref={cancelDeleteRef}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

return (
    <div class="delete-post">
      <span class="delete-tooltip">Delete Post</span>
      <span class="delete-icon" onClick={changeDeleteToggle}>
        ❌
      </span>
      {checkDeleteToggle()}
    </div>
  );
}

export default DeletePost;

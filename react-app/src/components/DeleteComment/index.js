import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../store/comments.js";
import * as likeAction from '../../store/UserLikes.js'
import "./deleteComment.css";

function DeleteComment({ commentId, postId }) {
  const dispatch = useDispatch();
  const deleteCommentRef = useRef();
  const deleteCommentContainerRef = useRef();
  const deleteCommentDenyRef = useRef();
  const [deleteCommentToggle, setDeleteCommentToggle] = useState(false);
  const [errors, setErrors] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

//   useEffect(() => {
//     const handleDelete = async (e) => {
//       e.preventDefault();
//       console.log(e.target);
//       if (deleteCommentRef.current === e.target) {
//         const res = await dispatch(
//           commentActions.deleteApplauseCommentThunk(commentId, postId)
//         );
//         if (res) {
//           setErrors(res);
//           return errors;
//         } else {
//           setDeleteCommentToggle(false);
//         }
//       } else if (deleteCommentContainerRef.current !== e.target) {
//         setDeleteCommentToggle(false);
//       }
//     };
//     document.addEventListener("click", handleDelete);

//   }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (deleteCommentRef.current.contains(e.target)) {
      const res = await dispatch(
        commentActions.deleteApplauseCommentThunk(commentId, postId)
      );
      if (res) {
        setErrors(res);
        return errors;
      } else {
        await dispatch(likeAction.getAllLikesThunk())
        setDeleteCommentToggle(false);
      }
    } else if ( !deleteCommentContainerRef.current.contains(e.target) ||deleteCommentDenyRef.current.contains(e.target)) {
      setDeleteCommentToggle(false);
    }
  };

  const toggleDeleteModal = () => {
    setDeleteCommentToggle(!deleteCommentToggle);
  };
  const checkDeleteModal = () => {
    if (deleteCommentToggle) {
      return (
        <div class="delete-card-comment" ref={deleteCommentContainerRef} >
          <div class="delete-card__icon-comment">🗑️</div>
          <div class="delete-card__title-comment">
            Are you sure you want to delete this comment?
          </div>
          <div class="delete-card__buttons-comment">
            <div class="delete-card__button-comment delete-card__button--cancel-comment"
            ref={deleteCommentDenyRef}
            onClick={handleDelete}>

              Cancel
            </div>
            <div
              class="delete-card__button-comment delete-card__button--confirm-comment"
              ref={deleteCommentRef}
              onClick={handleDelete}
            >
              Confirm
            </div>
          </div></div>

      );
    }
  };

  return (
    <div id="delete-comment-container" ref={deleteCommentContainerRef}>
      <button class="delete-button" onClick={toggleDeleteModal}>
        🗑️
      </button>
      {checkDeleteModal()}
    </div>
  );
}

export default DeleteComment;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../store/comments";
import "./commentCard.css";
import DeleteComment from "../DeleteComment";

function CommentCard({ comment, postId }) {
  const [updateCommentToggle, setUpdateCommentToggle] = useState(false);
  const [commentId, setCommentId] = useState(false);
  const [commentContent, setCommentContent] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = currentUser?.id;
    let username = currentUser?.username;
    let id = commentId;
    let comment = { id, commentContent, userId, username, postId };
    if (commentContent !== "") {
      await dispatch(commentActions.updateApplauseCommentThunk(comment)).then(
        (res) => {
          if (res) {
            setErrors(res);
            return errors;
          } else {
            setUpdateCommentToggle(false);
            setCommentContent(false);
            setCommentId(false);
            setErrors(false);
          }
        }
      );
    } else {
      let newErrors = {};
      if (commentContent?.length < 1)
        newErrors.commentContent =
          "Comments Cannot Be Updated To Empty, Use Delete For This Action";
      else if (commentContent?.length > 250)
        newErrors.commentContent = "Comments Cannot Exceed 250 Characters";
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
    }
  };

  return updateCommentToggle ? (
    <form className="comment">
      <div className="comment-details">
        <div className="comment-user">{comment?.username}</div>
        <div className="comment-date">{comment?.created_at.slice(0, 12)}</div>
      </div>
      <div className="error-comment">
        <div className="form-update">
          <textarea
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
            className="input-update"
          ></textarea>
          <span class="input-border"></span>
        </div>
        <span
          className={
            errors?.commentContent ? "error-tooltip-comment" : "hidden"
          }
        >
          {errors?.commentContent}
        </span>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  ) : (
    <div className="comment">
      <div className="comment-details">
        <div className="comment-user">{comment?.username}</div>
        <div className="comment-date">{comment?.created_at.slice(0, 12)}</div>
        {currentUser?.id === comment?.id ? (
          <div className="edit-delete-comment">
            <button
              className="edit-button"
              onClick={(e) => [
                setUpdateCommentToggle(true),
                setCommentContent(comment?.commentContent),
                setCommentId(comment?.id),
              ]}
            >
              📝
            </button>

            <DeleteComment commentId={comment?.id} postId={postId} />
          </div>
        ) : null}
      </div>
      <p>{comment?.commentContent}</p>
    </div>
  );
}

export default CommentCard;

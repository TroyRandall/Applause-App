import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../store/comments.js";
import { setUserProperties } from "firebase/analytics";
import "./createComment.css";

function CreateComment({ postId }) {
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState("");
  const [errors, setErrors] = useState({});
  const comments = useSelector((state) => state.comments);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {});

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    let userId = currentUser?.id;
    let username = currentUser?.username;
    let comment = { userId, username, commentContent, postId };
    if (commentContent !== "") {
      await dispatch(commentActions.createApplauseCommentThunk(comment)).then(
        (res) => {
          if (res) setErrors(res);
          return errors;
        }
      );
    } else {
      if (commentContent?.length < 1) setErrors('Comments Must Have Some Content Before They Can Be Posted')
      else if (commentContent?.length > 250) setErrors('Comments Cannot Exceed 250 Characters')
    }
  }
  

  return (
    <div className='error-comment'>
    <div class="comment-footer">
      <input
      type='textarea'
        placeholder="Add a comment..."
        class="comment-input"
        value={commentContent}
        required
        onChange={(e) => setCommentContent(e.target.value)}
      ></input>
      <button
        type="submit"
        class="comment-submit"
        id='comment-submit'
        onClick={handleCommentSubmit}
      >
        Post
      </button>

    </div>
    <span className='error-tooltip-comment'>{errors}</span>
    </div>
  );
}

export default CreateComment;

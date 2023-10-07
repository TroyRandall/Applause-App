import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../store/comments.js";
import CreateComment from "../CreateComment";
import CommentCard from "../CommentCard/index.js";
import "./allComments.css";

function AllComments({ postId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateCommentToggle, setUpdateCommentToggle] = useState(false);
  const [commentId, setCommentId] = useState(false);
  const [commentContent, setCommentContent] = useState(false)
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[postId]);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (postId) {
      dispatch(commentActions.getAllCommentsThunk(postId)).then(() =>
        setIsLoaded(true)
      );
    }
  }, [postId]);



  return (
    isLoaded && (comments ?
      <div class="comment-card">
      <div class="see-all-buttons">
      <div class="button-wrapper">
  <button class="see-all-comments-button">
    See All Comments...
    <span class="tooltip">Click to Show All The Comments For This Post</span>
  </button>
</div>
        <div class="h2"></div>
      </div>
      <div class="comment-body">
        {Object.values(comments).map((comment) => {
          if (comment) {
            return <CommentCard comment={comment} postId={postId} />
          } else return null;
        })}
        {currentUser ? <CreateComment postId={postId} /> : null}
      </div>
      </div> : (currentUser ? <CreateComment postId={postId} /> : null)
    )
  );
}

export default AllComments;

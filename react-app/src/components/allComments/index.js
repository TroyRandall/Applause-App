import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../store/comments.js";
import * as likeActions from "../../store/UserLikes.js";
import CreateComment from "../CreateComment";
import CommentCard from "../CommentCard/index.js";
import "./allComments.css";

function AllComments({ postId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateCommentToggle, setUpdateCommentToggle] = useState(false);
  const [commentId, setCommentId] = useState(false);
  const [commentContent, setCommentContent] = useState(false);
  const [errors, setErrors] = useState(false);
  const [seeComments, setSeeComments] = useState(false);
  const [lastComments, setLastComments] = useState({});
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[postId]);
  const currentUser = useSelector((state) => state.session.user);
  const likes = useSelector((state) => state.likes);

  useEffect(() => {
    if (postId) {
      dispatch(commentActions.getAllCommentsThunk(postId)).then(() =>
        dispatch(likeActions.getAllLikesThunk()).then(() => setIsLoaded(true))
      );
    }
  }, [postId, dispatch]);

  useCallback(() => {
    if (comments?.length > 0) {
      let formattedComments = {};
      let count = 0;
      comments.reverse().forEach((comment) => {
        while (count < 3) {
          formattedComments[comment?.id] = comment;
          count++;
        }
      });
      setLastComments(formattedComments);
    }
  }, [comments, postId, dispatch]);

  const toggleComments = () => {
    setSeeComments(!seeComments);
  };

  return (
    isLoaded &&
    (comments ? (
      <div class="comment-card">
        <div class="see-all-buttons">
          <div class="button-wrapper">
            {!seeComments ? (
              Object.values(comments)?.length > 3 ? (
                <button
                  class="see-all-comments-button"
                  onClick={toggleComments}
                >
                  See All Comments...
                  <span class="tooltip">
                    Click to Show All The Comments For This Post
                  </span>
                </button>
              ) : null
            ) : Object.values(comments)?.length > 3 ? (
              <button class="see-all-comments-button" onClick={toggleComments}>
                Hide Comments...
                <span class="tooltip">
                  Click to Hide All The Comments For This Post
                </span>
              </button>
            ) : null}
          </div>
          <div class="h2"></div>
        </div>
        <div class="comment-body">
          {!seeComments
            ? Object.values(comments).map((comment) => {
                if (comment) {
                  if (comment?.id + 3 >= Object.values(comments).length) {
                    return (
                      <CommentCard
                        comment={comment}
                        postId={postId}
                        key={comment?.id}
                        likes = {likes[comment?.id]}
                      />
                    );
                  } else return null;
                } else return null;
              })
            : Object.values(comments).map((comment) => {
                if (comment) {
                  return (
                    <CommentCard
                      comment={comment}
                      postId={postId}
                      key={comment?.id}
                      likes = {likes[comment?.id]}
                    />
                  );
                } else return null;
              })}
          {currentUser ? <CreateComment postId={postId} /> : null}
        </div>
      </div>
    ) : currentUser ? (
      <CreateComment postId={postId} />
    ) : null)
  );
}

export default AllComments;

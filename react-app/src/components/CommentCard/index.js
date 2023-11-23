import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../store/comments";
import * as likeActions from '../../store/UserLikes'
import "./commentCard.css";
import DeleteComment from "../DeleteComment";

function CommentCard({ comment, postId }) {
  const [updateCommentToggle, setUpdateCommentToggle] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(false);
  const [commentId, setCommentId] = useState(false);
  const [commentContent, setCommentContent] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const likes = useSelector((state) => state.likes)
  useEffect(() => {
    const loadLikes = async(e) => {
      await dispatch(likeActions.getAllLikesForComment(comment?.id))
    }
    loadLikes()
  }, [])

  const checkLiked = async(e) => {
    if(likes){
      Object.values(likes).forEach(like => {
        if(like?.userId === currentUser?.id){
          if(liked !== true) {
            setLiked(true)
            setLikeId(like?.id)
          }
          return true
        }
      })
      return false
    } else return false
  }
  const handleLike = async(e) => {
    if(liked){
      await dispatch(likeActions.deleteLikeThunk(likeId))
    } else {
      let userId = currentUser?.id;
      let commentId=comment?.id
      let like = {userId, commentId}
      await dispatch(likeActions.createLikeThunk(like))
    }
  }
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
    // <div className="comment">
    //   <div className="comment-details">
    //     <div className="comment-user">{comment?.username}</div>
    //     <div className="comment-date">{comment?.created_at.slice(0, 12)}</div>
    //     {currentUser?.id === comment?.userId ? (
    //       <div className="edit-delete-comment">
    //         <button
    //           className="edit-button"
    //           onClick={(e) => [
    //             setUpdateCommentToggle(true),
    //             setCommentContent(comment?.commentContent),
    //             setCommentId(comment?.id),
    //           ]}
    //         >
    //           📝
    //         </button>

    //         <DeleteComment commentId={comment?.id} postId={postId} />
    //       </div>
    //     ) : null}
    //   </div>
    //   <p>{comment?.commentContent}</p>
    // </div>
    <div class="comments">
    <div class="comment-react">
      <button onClick={handleLike}>
        {checkLiked() ? <svg fill="#f5356e" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#f5356e" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path></svg> : <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path>
        </svg>}
      </button>
      <hr />
      <span>{likes ? Object.values(likes).length : null}</span>
    </div>
    <div class="comment-container">
      <div class="user2">
        <div class="user-pic">
          <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
            <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
          </svg>
        </div>
        <div class="user-info">
          <span>{comment?.username}</span>
          <p>{comment?.created_at.slice(0, 12)}</p>
        </div>
      </div>
      <p class="comment-content">
        {comment?.commentContent}
      </p>
    </div>
  </div>

  );
}

export default CommentCard;

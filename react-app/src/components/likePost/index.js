import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as postLikeActions from "../../store/postLikes";
import "./likePost.css";

function LikePost({ post }) {
  const [liked, setLiked] = useState(false);
  const [likesIsLoaded, setLikesIsLoaded] = useState(false);
  const [likeId, setLikeId] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const likes = useSelector((state) => state.postLikes[post?.id]);

  useEffect(() => {
    const loadPostLikes = async () => {
      let res = await dispatch(postLikeActions.getAllLikesForPost(post?.id));
      if (res) {
        let response = Object.values(res);
        for (let i = 0; i < response.length; i++) {
          if (response[i].userId === currentUser?.id) {
            if (liked !== true) {
              setLiked(true);
              setLikeId(response[i].id);
              setLikeCounter(response?.length);
              return null;
            }
          }
        }
        setLikeCounter(response?.length);
        // if (dataToggle !== false) {
        //   setLiked(false);
        //   setLikeId(false);
        // }
      }
    };
    if (!toggle) {
      loadPostLikes().then(() => setLikesIsLoaded(true));
    }

  }, [post, dispatch, toggle]);

  const handleLikePost = async (e) => {
    e.preventDefault();
    console.log(likes);
    if (likes) {
      let allLikes = Object.values(likes);
      for (let i = 0; i < allLikes.length; i++) {
        if (allLikes[i]?.userId === currentUser?.id) {
          await dispatch(
            postLikeActions.deleteLikeThunkPost(allLikes[i]?.id, post?.id)
          );
          setLiked(false);
          setToggle(true);
          setToggle(false);
          return null;
        }
      }
      let userId = currentUser?.id;
      let postId = post?.id;
      let like = { userId, postId };
      let res = await dispatch(postLikeActions.createLikeThunkPost(like));
      setLiked(true);
      setToggle(true);
      setToggle(false);
      return null;
    } else {
      let userId = currentUser?.id;
      let postId = post?.id;
      let like = { userId, postId };
      let res = await dispatch(postLikeActions.createLikeThunkPost(like));
      setLiked(true);
      setToggle(true);
      setToggle(false);
      return null;
    }
  };

  return (
    <div className="comment-react-post">
      <button id="likePostButton" onClick={handleLikePost}>
        {liked ? (
          <svg
            id="likePostSVG"
            viewBox="0 0 24 24"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#57a0ff"
              stroke-linecap="round"
              stroke-width="2"
              stroke="#2d88ff"
              d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
            ></path>
          </svg>
        ) : (
          <svg
            id="likePostSVG"
            fill="none"
            viewBox="0 0 24 24"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#707277"
              stroke-linecap="round"
              stroke-width="2"
              stroke="#707277"
              d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
            ></path>
          </svg>
        )}
      </button>
      <vr />
      <span>{likeCounter}</span>
    </div>
  );
}

export default LikePost;

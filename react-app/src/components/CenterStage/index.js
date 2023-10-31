import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as allUserActions from "../../store/allUsers";
import * as postActions from "../../store/posts";
import UpdatePost from "../UpdatePost";
import DeletePost from "../DeletePost";
import Post from "../Posts";
import WhoToSupport from "../WhoToSupport";
import './centerStage.css'

function CenterStage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState();
  const currentUser = useSelector((state) => state.session.user);
  const allPosts = useSelector((state) => state.posts);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(allUserActions.getAllUsersThunk());
      await dispatch(postActions.getApplausePostsThunk()).then(() =>
        setIsLoaded(true)
      );
    };
    loadData();
  }, [dispatch]);

  return allPosts && (
    <div id="center-stage-container">
      <h2 id="center-stage-title">Center Stage</h2>
      <p id="center-stage-info">
        Where You Can See The Latest Public Posts From Everyone!
      </p>
      <div id="supporters-container-center-stage">
        <WhoToSupport />
      </div>
      <div id="center-stage-posts-container">
        {Object.values(allPosts)
          .reverse()
          .map((post) => {
            if (post !== null) {
              return currentUser?.id === post?.userId ? (
                <div className="post-container">
                  {" "}
                  <Post post={post} key={post.id} />
                  <div id="post-update-delete-container">
                    <UpdatePost
                      post={post}
                      musicSource={post.musicSrc}
                      imageSource={post.imageSrc}
                    />
                    <DeletePost post={post} />{" "}
                  </div>
                </div>
              ) : (
                <div className='post-container'>
                <Post post={post} key={post.id} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default CenterStage;

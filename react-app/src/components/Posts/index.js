import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import "./posts.css";

import UpdatePost from "../UpdatePost";
import AllComments from '../allComments';

function Post({ post }) {
  const waveformRefPost = useRef(null);
  const containerRefPost = useRef();
  const [playToggle, setPlayToggle] = useState(false);

  useEffect(() => {
    if (containerRefPost?.current && waveformRefPost?.current === null)
      waveformRefPost.current = WaveSurfer.create({
        container: containerRefPost.current,
        waveColor: "#084cdf",
        progressColor: "#02b0ff",
        height: 50,
        minPxPerSec: 1,
        className: "waveSurfer",

        fetchParams: {
          "Access-Control-Allow-Origin": "*",
          "X-Firebase-Appcheck": "eyJlcnJvciI6IlVOS05PV05fRVJST1IifQ==",
        },
      });
    waveformRefPost.current.load(post?.musicSrc);
  }, [post]);

  const playPause = () => {
    setPlayToggle(!playToggle);
    // const shadow = document.querySelector('.waveSurfer')
    // console.log(shadow.childNodes.forEach((child) => {
    //   console.log(child.shadowRoot.querySelector('audio'))
    //   const kid = child.shadowRoot.querySelectorAll('*')
    //   console.log(kid)}))
    // Array.from(allWaveSurfers).forEach((waveSurfer) => {
    //   console.log(waveSurfer)
    //   waveSurfer.stop()
    //   })

    waveformRefPost.current.playPause();
  };
  return (
    <div
      id={`post-container${post.id}`}
      className={playToggle ? "post-card-active" : "post-card"}
    >
      {post?.imageSrc !== "0" && post?.imageSrc !== false ? (
        <img
          className="post-card-image"
          src={post?.imageSrc}
          alt={post?.postContent}
          id="post-user-image"
        />
      ) : null}{" "}
      <div id="post-title-edit-container">
        <h2 id="post-title" className="post-card-title">
          {post?.postTitle}
        </h2>
      </div>
      <div className="post-card-body">
        <p id="post-description" className="post-card-body">
          {post?.postContent}
        </p>
        <div
          id={post?.musicSrc !== "0" ? "post-waveSurfer-container" : "hidden"}
        >
          <button
            onClick={playPause}
            className={
              post?.musicSrc !== "0"
                ? playToggle
                  ? "pause-btn"
                  : "play-btn"
                : "hidden"
            }
            id={`play/pause-wavesurfer${post?.id}`}
          ></button>
          <div
            id={`waveSurfer${post?.id}`}
            className="waveSurfer"
            ref={containerRefPost}
          ></div>
        </div>
      </div>
      <div className="post-footer">
        <h3 className="post-username">Post Created By {post?.username}</h3>
        <span className="post-date">{post?.created_at.slice(0, 12)}</span>
      </div>
      <AllComments postId={post?.id} />
    </div>
  );
}

export default Post;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import WaveSurfer from "wavesurfer.js";
import * as postActions from "../../store/posts";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

import "./updatePost.css";

function UpdatePost({ post, musicSource, imageSource }) {
  const [postTitle, setPostTitle] = useState(post ? post?.postTitle : "");
  const [postContent, setPostContent] = useState(post ? post?.postContent : "");
  const [imageSrc, setImageSrc] = useState(
    post ? (post?.imageSrc === "" ? imageSource : post?.imageSrc) : null
  );
  const [musicSrc, setMusicSrc] = useState(
    post ? (post?.musicSrc === "" ? musicSource : post?.musicSrc) : null
  );
  const [updateToggle, setUpdateToggle] = useState(false);
  const [count, setCount] = useState(0);
  //image useState
  const [imageToggle, setImageToggle] = useState(false);
  const [imageDone, setImageDone] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  //music useState
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicDone, setMusicDone] = useState(false);
  const [musicToggle, setMusicToggle] = useState(false);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts.userPosts)

  const containerUpdateRef = useRef();
  const waveformRefUpdate = useRef(null);
  const overlayRefUpdate = useRef();
  const editPostRef = useRef();

  useEffect(() => {
    if (musicSrc === "") setMusicSrc(null);
    if (imageSrc === "") setImageSrc(null);
    if (imageToggle) uploadImage();
    if (musicToggle) uploadMusic();
    if (containerUpdateRef.current && waveformRefUpdate.current === null) {
      waveformRefUpdate.current = WaveSurfer.create({
        container: containerUpdateRef.current,
        waveColor: "#084cdf",
        progressColor: "#02b0ff",
        height: 50,
        minPxPerSec: 1,

        fetchParams: {
          "Access-Control-Allow-Origin": "*",
          "X-Firebase-Appcheck": "eyJlcnJvciI6IlVOS05PV05fRVJST1IifQ==",
        },
      });

      waveformRefUpdate.current.on("interaction", () => {
        waveformRefUpdate.current.play();
      });
      if (musicSrc !== "" && musicSrc !== null) {
        waveformRefUpdate.current.load(musicSrc);
      }
      document
        .getElementById("play/pause-wavesurfer-update")
        .addEventListener("click", () => {
          waveformRefUpdate.current.playPause();
        });
    }
  }, [
    containerUpdateRef,
    dispatch,
    imageToggle,
    musicToggle,
    post,
    updateToggle,
    currentUser,
    musicSrc,
    imageSrc,
  ]);
  const toggleModal = () => {
    setUpdateToggle(true);
  };

  const UlClassName = "overlay-update" + (updateToggle ? "" : "hidden");

  const handleSubmit = (e) => {
    e.preventDefault();
    let userId = currentUser.id;
    let username = currentUser.username;
    let id = post.id;

    let updatedPost = {
      id,
      userId,
      username,
      postTitle,
      postContent,
      imageSrc,
      musicSrc,
    };

    dispatch(postActions.updateApplausePostThunk(updatedPost)).then((res) => {
      if (res) {
        setErrors(res);
        return res;
      } else {
        setErrors(false);
        setImageToggle(false);
        setMusicToggle(false);
        setUpdateToggle(false);
      }
    });
  };

  const uploadImage = (e) => {
    if (imageSrc === null) return;
    const imageRef = ref(
      storage,
      `${post?.userId}/images/${imageSrc?.name + v4()}`
    );
    uploadBytes(imageRef, imageSrc).then((response) => [
      setImageLoading(true),
      getDownloadURL(response.ref).then((res) => [
        setImageSrc(res === "" || res === undefined ? null : res),
        setImageLoading(false),
        setImageDone(true),
        setTimeout(() => setImageDone(false), 5000),
      ]),
      setImageToggle(false),
    ]);
  };

  const uploadMusic = (e) => {
    if (musicSrc === null) return;
    const musicRef = ref(
      storage,
      `${post?.userId}/music/${musicSrc?.name + v4()}`
    );
    uploadBytes(musicRef, musicSrc).then((response) => {
      getDownloadURL(response.ref).then((res) => [
        setMusicSrc(res === "" || res === undefined ? null : res),
        setMusicLoading(true),
        waveformRefUpdate.current.load(res).then(() => {
          setMusicLoading(false);
          setMusicDone(true);
        }),
      ]);
      setMusicToggle(false);
      setTimeout(() => setMusicDone(false), 5000);
    });
  };

  const resetForm = (e) => {
    if (
      overlayRefUpdate.current === e.target ||
      editPostRef.current === e.target
    ) {
      setUpdateToggle(false);
      setPostTitle(post?.postTitle);
      setImageSrc(post?.imageSrc);
      setMusicSrc(post?.musicSrc);
      setPostContent(post?.postContent);
      setErrors(false);
      setImageToggle(false);
      setMusicToggle(false);
    }
  };

  const checkUpdateModal = () => {
    if (updateToggle) {
      return (
        <div
          className={UlClassName}
          id="overlay"
          onClick={resetForm}
          ref={overlayRefUpdate}
          //   onTouchMoveCapture={(e) => e.stopPropagation}
        >
          <div id="create-post-component-container-update">
            <div id="create-post-content-container-update" ref={editPostRef}>
              <div id="create-post-preview-container-update" className="card">
                {imageSrc!=='false' && (imageSrc !== '0' && imageSrc !==null) ? (
                  <img
                    className="card-image"
                    src={imageSrc || post?.imageSrc}
                    alt={postContent || post?.postTitle || "No Image Available"}
                    id="create-post-user-image"
                  />
                ) : (
                  ""
                )}
                <h2
                  id="create-post-preview-title-update"
                  className="card-title"
                >
                  {postTitle || post?.postTitle}
                </h2>

                <div className="card-body">
                  <p id="create-post-preview-description" className="card-body">
                    {postContent || post?.postContent}
                  </p>
                  <div id="waveSurfer-container-update">
                    <button
                      className={musicSrc ? "play-btn" : "hidden"}
                      id="play/pause-wavesurfer-update"
                    ></button>
                    <div id="waveSurfer" ref={containerUpdateRef}></div>
                  </div>
                </div>

                <h3 id="create-post-preview-username-update" className="footer">
                  Post Created By {currentUser?.username}
                </h3>
                <span className="date">{post?.created_at.slice(0, 12)}</span>
              </div>
              <form
                id="create-post-forms-container-update"
                onSubmit={handleSubmit}
              >
                <div id="create-post-component-update" className="form2">
                  <p className={musicLoading ? "upload-loading" : "hidden"}>
                    Your Music Is Uploading...
                  </p>
                  <p className={musicDone ? "upload-loading" : "hidden"}>
                    Music Successfully Uploaded!
                  </p>
                  <p className={imageLoading ? "upload-loading" : "hidden"}>
                    Your Image Is Uploading...
                  </p>
                  <p className={imageDone ? "upload-loading" : "hidden"}>
                    Image Successfully Uploaded!
                  </p>
                  <h2 className="form-title">Edit Your Post</h2>
                  <p className="form-paragraph">
                    Share Your Thoughts, Photos, and Music
                  </p>
                  <div className="form-group">
                    <label for="post-title-update">Post Title</label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Title..."
                      required
                      id="post-title-update"
                    />
                  </div>

                  <div className="form-group">
                    <label for="post-description-update">Post Details</label>
                    <textarea
                      type="text"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Please Enter Some Details About Your Post..."
                      required
                      id="post-description-update"
                    />{" "}
                  </div>

                  <div className="form-group">
                    <label for="music-input-update">Music Input</label>
                    <input
                      required=""
                      id="music-input-update"
                      accept="audio/*"
                      type="file"
                      onChange={(e) => [
                        setMusicSrc(e.target.files[0]),
                        setMusicToggle(true),
                      ]}
                    />
                  </div>
                </div>{" "}
                <div className="form">
                  <span className="form-title">Upload your file</span>
                  <p className="form-paragraph">File should be an image</p>
                  <label for="file-input" className="drop-container">
                    <span className="drop-title">Drop files here</span>
                    or
                    <input
                      type="file"
                      accept="image/*"
                      required=""
                      id="file-input-update"
                      onChange={(e) => [
                        setImageSrc(e.target.files[0]),
                        setImageToggle(true),
                      ]}
                    />
                  </label>
                  <button type="submit">Update Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div class="edit-post" onClick={toggleModal}>
        <span class="edit-tooltip">Edit Post</span>
        <span class="edit-icon">⚙️</span>
      </div>
      {checkUpdateModal()}
    </div>
  );
}

export default UpdatePost;

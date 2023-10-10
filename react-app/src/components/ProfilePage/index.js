import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import WhoToSupport from "../WhoToSupport";

import { storage } from "../../firebase";
import { auth } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import MusicPlayer from "./musicPlayer";
import UpdatePost from "../UpdatePost";
import DeletePost from "../DeletePost";
import Post from "../Posts";
import * as postActions from "../../store/posts";
import * as userActions from "../../store/users";
import * as allUserActions from "../../store/allUsers";
import defaultCoverPhoto from "./defaultCoverPhoto.jpg";

import "./profilePage.css";

function ProfilePage() {
  const { id } = useParams();
  const [wsRef, setWSRef] = useState([]);
  const containerRef = useRef();
  const waveformRef = useRef(null);
  const overlayRef = useRef();
  const createPostRef = useRef();
  const quickRef = useRef();
  const dispatch = useDispatch();
  const [views, setViews] = useState(Math.floor(Math.random() * 1000000));
  const [percent, setPercent] = useState(Math.floor(Math.random() * 100));
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [quickPost, setQuickPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageToggle, setImageToggle] = useState(false);
  const [musicUpload, setMusicUpload] = useState(null);
  const [musicUrl, setMusicUrl] = useState(false);
  const [imageURL, setImageUrl] = useState(false);
  const [imageDone, setImageDone] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [musicToggle, setMusicToggle] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicDone, setMusicDone] = useState(false);
  const [errors, setErrors] = useState({});

  const allPosts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.session.user);
  const currentProfile = useSelector((state) => state.users.info);
  const allUsers = useSelector((state) => state.allUsers.users);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(allUserActions.getAllUsersThunk());
      await dispatch(userActions.getUserByIdThunk(id));
      await dispatch(postActions.getApplausePostsThunk(id)).then(() =>
        setIsLoaded(true)
      );
    };
    if (id) loadData();
    if (imageToggle) uploadImage();
    if (musicToggle) uploadMusic();
    if (containerRef.current && waveformRef.current === null) {
      waveformRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#084cdf",
        progressColor: "#02b0ff",
        height: 50,
        minPxPerSec: 1,

        fetchParams: {
          "Access-Control-Allow-Origin": "*",
          "X-Firebase-Appcheck": "eyJlcnJvciI6IlVOS05PV05fRVJST1IifQ==",
        },
      });

      waveformRef.current.on("interaction", () => {
        waveformRef.current.play();
      });

      document
        .getElementById("play/pause-wavesurfer")
        .addEventListener("click", () => {
          waveformRef.current.playPause();
        });
    }
  }, [
    imageUpload,
    musicUpload,
    containerRef,
    dispatch,
    id,
    imageToggle,
    musicToggle,
    currentUser,
    description,
    errors
  ]);

  const toggleModal = (e) => {
    e.preventDefault();
    setToggle(true);
  };

  const UlClassName = "overlay" + (toggle ? "" : "hidden");

  const uploadImage = (e) => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${id}/images/${imageUpload?.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((response) => [
      setImageLoading(true),
      getDownloadURL(response.ref).then((res) => [
        setImageUrl(res),
        setImageLoading(false),
        setImageDone(true),
        setTimeout(() => setImageDone(false), 5000),
      ]),
      setImageToggle(false),
    ]);
  };

  const uploadMusic = (e) => {
    if (musicUpload === null || musicUpload === "") return;
    const musicRef = ref(storage, `${id}/music/${musicUpload?.name + v4()}`);
    uploadBytes(musicRef, musicUpload).then((response) => {
      getDownloadURL(response.ref).then((res) => [
        setMusicUrl(res),
        setMusicLoading(true),
        waveformRef.current.load(res).then(() => {
          setMusicLoading(false);
          setMusicDone(true);
        }),
      ]);
      setMusicToggle(false);
      setTimeout(() => setMusicDone(false), 5000);
    });
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    let postContent = quickPost;
    let userId = currentUser?.id;
    let username = currentUser?.username
    if (postContent === null || postContent?.length < 1){
      let newErrors = {}
      newErrors.quickPost = 'You Must Enter Some Text To Create a Post'
      setErrors(newErrors);
      return null
    }
    else {
      let post = { userId, username, postContent };
      dispatch(postActions.createApplausePostThunk(post)).then((res) => {
        if (res !== null) {
          setErrors(res);
          return res;
        } else {
          setToggle(false);
          setPostTitle('');
          setImageUpload(false);
          setImageUrl(false);
          setMusicUrl(false);
          setMusicUpload(false);
          setQuickPost('');
          setErrors({});
          setImageToggle(false);
          setMusicToggle(false);
        }
      });
    }
  }


  const handleSubmit = (e, quickPost1) => {
    e.preventDefault();
    if (quickPost1) {
      let postContent = quickPost;
      if (postContent === null) return null;
      else {
        let post = { postContent: postContent };
        dispatch(postActions.createApplausePostThunk(post)).then((res) => {
          if (res !== null) {
            setErrors(res);
            return res;
          } else {
            setToggle(false);
            setPostTitle('');
            setImageUpload(false);
            setImageUrl(false);
            setMusicUrl(false);
            setMusicUpload(false);
            setQuickPost('');
            setErrors({});
            setImageToggle(false);
            setMusicToggle(false);
            waveformRef?.current.destroy()
            waveformRef.current = null
          }
        });
      }
    } else {
      let newErrors = {};
      if (description?.length < 1)
        newErrors.postContent = "Details About Your Post Are Required";
      if (description?.length > 255)
        newErrors.postContent =
          "Your Post Cannot Be Greater Than 255 Characters";
      if (imageLoading !== false)
        newErrors.imageLoading =
          "You Must Wait For The Image To Upload Before Creating Your Post";
      if (musicLoading !== false)
        newErrors.musicLoading =
          "You Must Wait For The Music To Upload Before Creating Your Post";
      let postContent = description;
      let userId = currentUser.id;
      let username = currentUser.username;
      let imageSrc = imageURL;
      let musicSrc = musicUrl;
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      if (Object.values(newErrors).length > 0) return;
      else {
        let post = {
          userId,
          username,
          postTitle,
          postContent,
          imageSrc,
          musicSrc,
        };
        dispatch(postActions.createApplausePostThunk(post)).then((res) => {
          if (res !== null) {
            setErrors(res);
            return res;
          } else {
            setToggle(false);
            setPostTitle('');
            setImageUpload(false);
            setImageUrl(false);
            setMusicUrl(false);
            setMusicUpload(false);
            setDescription('');
            setErrors({});
            setImageToggle(false);
            setMusicToggle(false);
          }
        });
      }
    }
  };

  const resetForm = (e) => {
    if (overlayRef.current === e.target || createPostRef.current === e.target) {
      setToggle(false);
      setPostTitle('');
      setImageUpload(false);
      setImageUrl(false);
      setMusicUrl(false);
      setMusicUpload(false);
      setDescription('');
      setErrors({});
      setImageToggle(false);
      setMusicToggle(false);
    }
  };

  const checkModal = () => {
    if (toggle) {
      return (
        <div
          className={UlClassName}
          id="overlay"
          onClick={resetForm}
          ref={overlayRef}
        >
          <div id="create-post-component-container">
            <div id="create-post-content-container" ref={createPostRef}>
              <div id="create-post-preview-container" className="card">
                {imageURL ? (
                  <img
                    className="card-image"
                    src={imageURL}
                    alt={description || "No Image Available"}
                    id="create-post-user-image"
                  />
                ) : (
                  ""
                )}
                <h2 id="create-post-preview-title" className="card-title">
                  {postTitle || "Post Title"}
                </h2>

                <div className="card-body">
                  <p id="create-post-preview-description" className="card-body">
                    {description || "Post Description Goes Here..."}
                  </p>
                  <div id="waveSurfer-container">
                    <button
                      className={musicUrl ? "play-btn" : "hidden"}
                      id="play/pause-wavesurfer"
                    ></button>
                    <div id="waveSurfer" ref={containerRef}></div>
                  </div>
                </div>

                <h3 id="create-post-preview-username" className="footer">
                  Post Created By {currentUser?.username}
                </h3>
                <span className="date">
                  {auth?.currentUser?.metadata?.lastSignInTime?.slice(0, 12)}
                </span>
              </div>
              <form id="create-post-forms-container" onSubmit={handleSubmit}>
                <div id="create-post-component" className="form2">
                  <p
                    className={
                      errors?.musicLoading ? "error-loading" : "hidden"
                    }
                  >
                    {errors?.musicLoading}
                  </p>
                  <p
                    className={
                      errors?.imageLoading ? "error-loading" : "hidden"
                    }
                  >
                    {errors?.imageLoading}
                  </p>
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
                  <h2 className="form-title">Create Your Post</h2>
                  <p className="form-paragraph">
                    Share Your Thoughts, Photos, and Music
                  </p>
                  <div className="form-group">
                    <label for="post-title">Post Title</label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Title..."
                      id="post-title"
                    />
                  </div>

                  <div className="form-group">
                    {" "}
                    <div class="error-post">
                      <label for="post-description">Post Details</label>
                      <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please Enter Some Details About Your Post..."
                        id="post-description"
                      />{" "}
                      <span className={errors?.postContent ? "error-tooltip" : 'hidden'}>{errors?.postContent}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="error-post">
                      <label for="music-input">Music Input</label>
                      <input
                        required=""
                        id="music-input"
                        accept="audio/*"
                        type="file"
                        onChange={(e) => [
                          waveformRef?.current.destroy(),
                          waveformRef.current = null,
                          setMusicUpload(e.target.files[0]),
                          setMusicToggle(true),

                        ]}
                      />
                      <span class={errors?.musicUrl ? "error-tooltip" : 'hidden'}id="error-music">
                        {errors?.musicUrl}
                      </span>
                    </div>
                  </div>
                </div>{" "}
                <div className="form">
                  <div className="errors-post">
                    <span className="form-title">Upload your file</span>
                    <p className="form-paragraph">File should be an image</p>
                    <label for="file-input" className="drop-container">
                      <span className="drop-title">Drop files here</span>
                      or
                      <input
                        type="file"
                        accept="image/*"
                        required=""
                        id="file-input"
                        onChange={(e) => [
                          setImageUpload(e.target.files[0]),
                          setImageToggle(true),
                        ]}
                      />
                    </label>
                    <span class={errors?.imageUrl ? "error-tooltip" : 'hidden'} id="error-image">
                      {errors?.imageUrl}
                    </span>
                  </div>

                  <button type="submit">Create Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    isLoaded && (
      <div id="profile-page-container">
        <img
          id="profile-page-cover-photo"
          src={defaultCoverPhoto}
          alt="a crowd going crazy at a concert"
        />
        <div id="profile-page-first-row">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <div class="profile-image">
                  <img
                    id="profile-page-user-image"
                    src={currentProfile?.imageUrl}
                    alt="a profile for an applause user account"
                    class="profile-image"
                  />
                </div>
                <div class="name">{currentProfile?.role}</div>
              </div>
              <div class="flip-card-back">
                <div class="Description">
                  <p class="description">{currentProfile?.aboutMe}</p>
                  <div class="socialbar">
                    <a href="#" id="github">
                      <i class="fab fa-github"></i>
                    </a>
                    <a href="#" id="instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" id="facebook">
                      <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" id="twitter">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="profile-page-user-info">
            {" "}
            <h2 id="profile-page-full-name">{`${currentProfile?.firstName} ${currentProfile?.lastName}`}</h2>
            <h4 id="profile-page-username">{currentProfile?.username}</h4>
            {currentUser ?
            <form class="post-card-create" onSubmit={handleQuickSubmit} >
              <div className='error-post-quickPost'>
              <span className={errors?.quickPost ? "error-tooltip-quickPost" : 'hidden'}>{errors?.quickPost}</span>
              </div>
              <textarea
                placeholder="What's keeping you busy?"
                type="text"
                value={quickPost}
                onChange={(e) => setQuickPost(e.target.value)}
              ></textarea>
              <hr />
              <button class="post" type='submit' ref={quickRef} onCLick={handleQuickSubmit}>
                Create Post
              </button>
              <button class="upload" onClick={toggleModal}>
                Upload
              </button>
            </form>: null}
            {checkModal()}
          </div>
          <div class="stats shadow gradient">
            <div class="stat">
              <div class="stat-title">Total Page Views</div>
              <div class="stat-value">{views}</div>
              <div class="stat-desc">{percent}% more than last month</div>
            </div>
          </div>
        </div>{" "}
        <div id="profile-content-container">
          <div id="supporters-container">
            <WhoToSupport />
          </div>
          <div>
            {Object.values(allPosts)?.length > 0 ? (
              <div id="profile-page-posts-container">
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
                        <Post post={post} key={post.id} />
                      );
                    }
                  })}
              </div>
            ) : +currentUser?.id === +id ? (
              <h3 id="no-post-container">
                Start Creating Posts To Fill Out This Section Of Your Profile
              </h3>
            ) : (
              <h3 id="no-post-container">
                There Are No Posts To Show From This User...
              </h3>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;

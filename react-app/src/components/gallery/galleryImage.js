import React, { useEffect, useState } from "react";
import "./galleryImage.css";
import * as userActions from '../../store/session'
import { useDispatch } from "react-redux";

function GalleryImage({ photoUrl, photoId, id }) {
  const [fullscreenToggle, setFullscreenToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelFullscreen = (e) => {
      e.preventDefault();
      const image = document.getElementById(photoId);
      if (e.target !== image) {
        setFullscreenToggle(false);
      }
    };
    if (fullscreenToggle) {
      const image = document.getElementById(photoId);
      image.addEventListener("click", cancelFullscreen);

      return () => image.removeEventListener("click", cancelFullscreen);
    }
  }, [fullscreenToggle, photoId]);

  const handleProfilePhoto = () => {
    const url = photoUrl
    dispatch(userActions.updatePhoto(url, id))
  }

  const handleCoverPhoto = () => {
    const url = photoUrl
    dispatch(userActions.updateCoverPhoto(url, id));
  }
  const checkFullscreen = () => {
    if (fullscreenToggle) {
      return (
        <>
          <div
            className="overlay"
            id='overlay-gallery'
            onClick={(e) => [e.stopPropagation(), setFullscreenToggle(false)]}
          >
            <img
              src={photoUrl}
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()}
              id={photoId}
              key={photoId}
            ></img>
            <div className='buttons-container'>
               <button onClick ={handleProfilePhoto} id='updatePhoto'>Make Profile Photo</button>
               <button onClick ={handleCoverPhoto} id='updateCoverPhoto'>Make Cover Photo</button>
            </div>

          </div>
        </>
      );
    }
  };
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setFullscreenToggle(true);
  };
  return (
    <>
      <img
        src={photoUrl}
        className={"gallery-image"}
        id={photoId}
        key={photoId}
        onClick={toggleFullscreen}
      />
      {checkFullscreen()}
    </>
  );
}

export default GalleryImage;

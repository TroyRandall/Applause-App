import React, { useEffect, useState } from "react";
import "./galleryImage.css";
import * as userActions from '../../store/session'
import * as photoActions from '../../store/userPhotos';
import { useDispatch, useSelector } from "react-redux";
import { setUserProperties } from "firebase/analytics";

function GalleryImage({ photoUrl, photoId, id }) {
  const [fullscreenToggle, setFullscreenToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user)

  useEffect(() => {
    const cancelFullscreen = (e) => {
      e.preventDefault();
      const image = document.getElementById(photoId);
      const overlay = document.getElementsByClassName('overlay')
      if (e.target === overlay) {
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
    setFullscreenToggle(false);
  }

  const handleCoverPhoto = () => {
    const url = photoUrl
    dispatch(userActions.updateCoverPhoto(url, id));
    setFullscreenToggle(false);
  }

  const handleDeletePhoto = async() => {
    const response = await dispatch(photoActions.deletePhotoByUserThunk(currentUser?.id, photoId))
    if(response){
      setErrors(response)
    }
  }

  const checkDeleteToggle = () => {
    if(deleteToggle) {
      return (
        <div className='overlay' id='overlay-delete' onClick={(e) => [e.stopPropagation(),setDeleteToggle(false)]}>
          <div className='card delete' onClick ={e => e.stopPropagation()}>
            <div>
              <h2 className = 'card-header delete-header2'>Warning</h2>
              <p className='card-body' >You are about to delete this photo. If you would like to continue with this action, press Delete. Otherwise, please press Cancel.</p>
            </div>
            <div className='delete-buttons'>
              <button className='cancel-delete'onClick={() => setDeleteToggle(false)}>Cancel</button>
              <button className='confirm-delete'onClick={handleDeletePhoto}>Delete</button>
            </div>
          </div>
        </div>
      )
    }
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
            {currentUser?.id === +id ?
            <div className='buttons-container'>
               <button onClick ={handleProfilePhoto} id='updatePhoto'>Make Profile Photo</button>
               <button onClick ={handleCoverPhoto} id='updateCoverPhoto'>Make Cover Photo</button>
               <button onClick={(e) => [e.stopPropagation(), setDeleteToggle(true)]} id='deletePhoto'>Delete Photo</button>
            </div> : null }
            {checkDeleteToggle()}

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

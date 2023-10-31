import React, { useState } from "react";

import "./uploadPhoto.css";
import { useDispatch } from "react-redux";
import * as photoActions from '../../store/userPhotos';


import { storage } from "../../firebase";
import { auth } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { setUserProperties } from "firebase/analytics";

function AddPhoto({ userId }) {
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!photos.length) return;
    setUploading(true);
    photos.forEach((photo) => {
      const imageRef = ref(storage, `${userId}/gallery/${photo?.name + v4()}`);
      uploadBytes(imageRef, photo).then((res) => {
        getDownloadURL(res.ref).then(async (response) => {
          const photoUrl = response;
          const coverPhoto = false;
          const userPhoto = { userId, photoUrl, coverPhoto}
          const res = await dispatch(photoActions.createPhotoByUserThunk(userPhoto))
          if(res) {
            setErrors(res);
          }
          })
      })
    })
    setUploading(false);
    // const imageRef = ref(storage, `${id}/images/${imageUpload?.name + v4()}`);
    // uploadBytes(imageRef, imageUpload).then((response) => [
    //   getDownloadURL(response.ref),
    // ]);
  };


  return (
    <div className="add-photo-toggle">
      <form class="form-gallery">
        {uploading ? (
          <p>You're Images Are Uploading, Please Be Patient.</p>
        ) : null}
        <span class="form-title">Upload your file</span>
        <p class="form-paragraph">File should be an image</p>
        <label for="file-input" class="drop-container">
          <span class="drop-title">Drop files here</span>
          or
          <input
            type="file"
            multiple="multiple"
            accept="image/*"
            required=""
            id="file-input"
            onChange={(e) => {
              setPhotos([]);
              if (e.target.files.length > 1) {
                setPhotos((photos) => [...photos, ...e.target.files]);
              } else {
                const [file] = e.target.files;
                setPhotos((photos) => [...photos, file]);
              }
            }}
          />
        </label>

        <div class="button-container">
          <button class="cancel-button" id='cancelButton'>Cancel</button>
          <button class="submit-button" onClick={handleAddPhoto}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPhoto;

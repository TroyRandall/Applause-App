import React, { useState } from "react";

import './uploadPhoto.css';

function AddPhoto() {
  const [addToggle, setAddToggle] = useState(false);

  const togglePhoto = () => {
    setAddToggle(true);
  };

  const checkPhotoToggle = () => {
    if (addToggle) {
      return (
        <form class="form">
          <span class="form-title">Upload your file</span>
          <p class="form-paragraph">File should be an image</p>
          <label for="file-input" class="drop-container">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" accept="image/*" required="" id="file-input" />
          </label>

          <div class="button-container">
            <button class="cancel-button">Cancel</button>
            <button class="submit-button">Submit</button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="add-photo-toggle">
      <button onClick={togglePhoto}></button>
      {checkPhotoToggle()}
    </div>
  );
}

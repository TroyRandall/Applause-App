import React, { useEffect, useState } from "react";
import "./galleryImage.css";

function GalleryImage({ photoUrl, photoId }) {
  const [fullscreenToggle, setFullscreenToggle] = useState(false);

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

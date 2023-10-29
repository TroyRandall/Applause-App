import React, { useEffect, useState } from "react";

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
      document.addEventListener("click", cancelFullscreen);

      return () => document.removeEventListener("click", cancelFullscreen);
    }
  }, [fullscreenToggle]);
  const toggleFullscreen = (e) => {
    e.preventDefault();
    setFullscreenToggle(true);
  };
  return (
    <img
      src={photoUrl}
      className={"gallery-image"}
      id={photoId}
      key={photoId}
      onClick={toggleFullscreen}
    />
  );
}

export default GalleryImage

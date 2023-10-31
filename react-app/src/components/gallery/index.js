import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as photoActions from "../../store/userPhotos";
import GalleryImage from "./galleryImage";
import "./gallery.css";
import AddPhoto from "../uploadPhoto";

function Gallery({ userId, currentUser }) {
  const [count, setCount] = useState(0);
  const [galleryToggle, setGalleryToggle] = useState(false);
  const [addToggle, setAddToggle] = useState(false);
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos);

  useEffect(() => {
    const loadPhotos = async () => {
      await dispatch(photoActions.getPhotosByUserThunk(userId));
    };
    loadPhotos();
    if (addToggle) {
      const cancel = document.getElementById("cancelButton");
      cancel.addEventListener("click", () => {
        setAddToggle(false);
      });
      return () =>
        cancel.removeEventListener("click", () => {
          setAddToggle(false);
        });
    }
    console.log(photos);
  }, [dispatch, addToggle]);

  const handleGallery = (e) => {
    e.preventDefault();
    setGalleryToggle(true);
  };

  const togglePhoto = () => {
    setAddToggle(true);
  };

  const cancelGallery = (e) => {
    e.preventDefault();
    setGalleryToggle(false);
  };
  const checkGalleryToggle = () => {
    if (galleryToggle) {
      return (
        <div className="overlay" onClick={cancelGallery}>
          <div className="gallery-card">
            <div className="gallery-header">
              <h3>All Photos</h3>
              <p>
                This is A Photo Gallery, Where You Can Interact With A Users
                Photos. Click On Any Image To See It In Full Size.
              </p>
            </div>
            <div
              id={photos ? "images" : "NA"}
              onClick={(e) => e.preventDefault()}
            >
              {photos ? (
                Object.values(photos).map((photo) => {
                   return (
                    <GalleryImage
                      photoUrl={photo.photoUrl}
                      photoId={photo.id}
                    />
                  );
                })
              ) : (
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhesolutions.com.pk%2Fwp-content%2Fuploads%2F2019%2F01%2Fpicture-not-available.jpg&f=1&nofb=1&ipt=55b945fe5566220cda53ab578d3e61883c6bd0e5ebc326e7efea8e506d842d84&ipo=images"
                  alt="Image Not Available"
                  className="image-not-available"
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return addToggle ? (
    <div class="photo-gallery-card">
      <div class="card-header">
        <h1>Photo Gallery</h1>
      </div>
      <AddPhoto userId={userId} />
    </div>
  ) : (
    <div class="photo-gallery-card">
      <div class="card-header">
        <h1>Photo Gallery</h1>
      </div>

      <div class="card-body">
        <div class={photos ? "gallery" : "gallery-NA"}>
          {Object.values(photos)[0] !== null ? (
            setCount(0),
            Object.values(photos).map((photo) => {
              console.log(photos);
              if (count <= 6) {
                setCount(count + 1);
                console.log(photo);
                return (
                  <img
                    src={photo.photoUrl}
                    alt="A User Upload"
                    className="image-preview"
                  />
                );
              }
            })
          ) : (
            <div>
              {" "}
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhesolutions.com.pk%2Fwp-content%2Fuploads%2F2019%2F01%2Fpicture-not-available.jpg&f=1&nofb=1&ipt=55b945fe5566220cda53ab578d3e61883c6bd0e5ebc326e7efea8e506d842d84&ipo=images"
                alt="Image Not Available"
                className="image-not-available"
              />
            </div>
          )}
        </div>
        {photos ? (
          Object.values(photos).length > 6 ? (
            addToggle ? null : (
              <a class="see-all-photos" href="#" onClick={handleGallery}>
                See all photos...
              </a>
            )
          ) : null
        ) : currentUser?.id === +userId ? (
          <button onClick={togglePhoto} className="uploadPhoto">
            Upload
          </button>
        ) : (
          <p id="user-images-NA">
            This User Has Not Uploaded Any Photos Yet...
          </p>
        )}
        {currentUser?.id === +userId && photos ? (
          Object.values(photos).length > 6 ? (
            <button onClick={togglePhoto} className="uploadPhoto">
              Upload
            </button>
          ) : null
        ) : null}
      </div>
      {checkGalleryToggle()}
    </div>
  );
}

export default Gallery;

import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';

function ProfilePageTest () {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const allImagesRef = ref(storage, 'images/');

    useEffect(() => {
        listAll(allImagesRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        });
    }, [allImagesRef])

    const uploadImage = async () => {
        if(imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);uploadBytes(imageRef, imageUpload).then((response) => {
            alert('Your Image Has Been Uploaded')
        })
        

    }


    return (
        <div id='profile-page-picture-container'>
            <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
            <button onClick={uploadImage} >Upload Image</button>

            {imageList.map((url) => {
                return <img src={url} />
            })}
        </div>
    )
}

export default ProfilePageTest;

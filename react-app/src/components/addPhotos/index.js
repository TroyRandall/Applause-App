import React, { useState } from 'react';

function AddPhotos ({ userId }) {
const [addPhoto, setAddPhoto] = useState(false);

const checkModal = (e) => {
    e.preventDefault();
    if(addPhoto) {
        return (

            
        )
    }
}

return (
    <div className='create-photo'>
        <button className='create-photo-button'>Add Photos</button>
        {checkModal()}
    </div>
)
}

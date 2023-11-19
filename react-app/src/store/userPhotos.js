const GET_PHOTOS_BY_USER = "photos/GET_PHOTOS_BY_USER";
const CREATE_PHOTO_BY_USER = "photos/CREATE_PHOTO_BY_USER";
const DELETE_PHOTO_BY_USER = "photos/DELETE_PHOTO_BY_USER";
const UPDATE_PHOTO_BY_USER = "photos/UPDATE_PHOTO_BY_USER";

const getPhotosByUser = (formattedData) => ({
  type: GET_PHOTOS_BY_USER,
  payload: formattedData,
});

const createPhotoByUser = (data, userId) => ({
  type: CREATE_PHOTO_BY_USER,
  payload: {
    data: data,
    userid: userId,
  },
});

const updatePhotoByUser = (data) => ({
  type: UPDATE_PHOTO_BY_USER,
  payload: data,
});

const deletePhotoByUser = (userId, id) => ({
  type: DELETE_PHOTO_BY_USER,
  payload:  {
    userId: userId,
    id: id
  }
});

export const getPhotosByUserThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/photos/${id}`);

  if (response.ok) {
    const data = await response.json();
    let formattedData = {};
    data.forEach((photo) => {
      formattedData[photo.id] = photo;
    });
    console.log(formattedData);
    dispatch(getPhotosByUser(formattedData));
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

export const createPhotoByUserThunk = (userPhoto) => async (dispatch) => {
  let { userId, photoUrl, coverPhoto } = userPhoto;
  const response = await fetch(`/api/photos/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      photoUrl,
      coverPhoto: "0",
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createPhotoByUser(data, userId));
    return null;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const updatePhotoByUserThunk = (userPhoto) => async (dispatch) => {
  let { id, userId, photoUrl, coverPhoto } = userPhoto;
  const response = await fetch(`/api/photos/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.Stringify({
      id,
      userId,
      photoUrl,
      coverPhoto,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updatePhotoByUser(data));
    return null;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const deletePhotoByUserThunk = (userId, id) => async (dispatch) => {
  const response = await fetch(`/api/photos/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await dispatch(deletePhotoByUser(userId, id));
    return null;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

const initialState = { byUser: null };

export default function photoReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_PHOTOS_BY_USER:
      newState = { ...state };
      newState = { ...action.payload };
      return newState;
    case CREATE_PHOTO_BY_USER:
      newState = { ...state };
      newState[action.payload.data.id] = action.payload.data;
      return newState;
    case UPDATE_PHOTO_BY_USER:
      newState = { ...state };
      delete newState[action.payload.data.userId][action.payload.data.id];
      newState[action.payload.data.userId][action.payload.data.id] = {
        ...action.payload.data,
      };
      return newState;
    case DELETE_PHOTO_BY_USER:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}

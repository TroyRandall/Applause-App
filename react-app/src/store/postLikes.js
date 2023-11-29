const GET_ALL_LIKES_POSTLIKES = "likes/GET_ALL_LIKES";
const GET_ALL_LIKES_POST = 'likes/GET_ALL_LIKES_POST'
const CREATE_LIKE_POST = "likes/CREATE_LIKE";
const DELETE_LIKE_POST = "likes/DELETE_LIKE";

const getAllLikes = (data) => ({
  type: GET_ALL_LIKES_POSTLIKES,
  payload: data,
});

const getAllLikesPost = (data, postId) => ({
    type: GET_ALL_LIKES_POST,
    payload: {
      data: data,
      postId: postId,
    },
  });

const createLikePost = (data, postId) => ({
  type: CREATE_LIKE_POST,
  payload: {
    data: data,
    postId: postId,
  },
});

const deleteLikePost = (id, postId) => ({
  type: DELETE_LIKE_POST,
  payload: {
    id: id,
    postId: postId,
  },
});

export const getAllLikesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/likes/`);

  if (response.ok) {
    let newData = {};
    let newLike = {};
    const data = await response.json();
    data.forEach((like) => {
      newLike = {};
      newLike[like?.id] = like;
      if (newData[like?.postId]) {
        newData[like?.postId] = { ...newData[like?.postId],like };
      } else {
        newData[like?.postId] = { ...like };
      }
    });
    await dispatch(getAllLikes(newData));
    return null;
  }
};

export const getAllLikesForPost = (id) => async (dispatch) => {
  const response = await fetch(`/api/likes/post/${id}`);
  if (response.ok) {
    let newData = {};
    const data = await response.json();
    data.forEach((like) => {
      newData[like?.id] = like;
    });
    await dispatch(getAllLikesPost(newData, id));
    return newData;
  }
};

//somewhere in this reducer it is messing up the flow of data and causing the frontend to not load properly. I am most likley going to add a loop in the reducer itself and normalize all the data in there so I know it is getting back correctly. atleast for create and delete."+++++++++++++++++++++

export const createLikeThunkPost = (Like) => async (dispatch) => {
  let { userId, postId } = Like;
  const response = await fetch(`/api/likes/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Like, postId),
  });

  if (response.ok) {
    const data = await response.json();
    await dispatch(createLikePost(data, postId));
    return data;
  }
};

export const deleteLikeThunkPost = (id, postId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await dispatch(deleteLikePost(id, postId));
    return null;
  }
};

const initialState = { postLikes: null };

export default function postLikesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_LIKES_POSTLIKES:
      newState = { ...state};
      newState = {...action.payload}
      return newState;
    case GET_ALL_LIKES_POST:
        newState = { ...state };
        newState[action.payload.postId] = {...newState[action.payload.postId] ,...action.payload.data};
        return Object.assign({}, newState);
    case CREATE_LIKE_POST:
      newState = { ...state };
      newState[action.payload.postId] = {...newState[action.payload.postId] , ...action.payload.data}
      return Object.assign({}, newState);
    case DELETE_LIKE_POST:
      newState = { ...state };
      delete newState[action.payload.postId][action.payload.id];
      return Object.assign({}, newState);
    default:
      return state;
  }
}

import usersInfoReducer from "./users";

const GET_ALL_LIKES = "likes/GET_ALL_LIKES";
const GET_ALL_LIKES_COMMENT = 'likes/GET_ALL_LIKES_COMMENT'
const CREATE_LIKE = "likes/CREATE_LIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";

const getAllLikes = (data) => ({
  type: GET_ALL_LIKES,
  payload: data,
});

const getAllLikesComment = (data, commentId) => ({
    type: CREATE_LIKE,
    payload: {
      data: data,
      commentId: commentId,
    },
  });

const createLike = (data, commentId) => ({
  type: CREATE_LIKE,
  payload: {
    data: data,
    commentId: commentId,
  },
});

const deleteLike = (id, commentId) => ({
  type: DELETE_LIKE,
  payload: {
    id: id,
    commentId: commentId,
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
      if (newData[like?.commentId]) {
        newData[like?.commentId] = { ...newData[like?.commentId],like };
      } else {
        newData[like?.commentId] = { ...like };
      }
    });
    await dispatch(getAllLikes(newData));
    return null;
  }
};

export const getAllLikesForComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/likes/comment/${id}`);
  if (response.ok) {
    let newData = {};
    const data = await response.json();
    data.forEach((like) => {
      newData[like?.id] = like;
    });
    await dispatch(getAllLikesComment(newData, id));
    return newData;
  }
};

//somewhere in this reducer it is messing up the flow of data and causing the frontend to not load properly. I am most likley going to add a loop in the reducer itself and normalize all the data in there so I know it is getting back correctly. atleast for create and delete."+++++++++++++++++++++

export const createLikeThunk = (Like) => async (dispatch) => {
  let { userId, commentId } = Like;
  const response = await fetch(`/api/likes/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Like, commentId),
  });

  if (response.ok) {
    const data = await response.json();
    await dispatch(createLike(data, commentId));
    return data;
  }
};

export const deleteLikeThunk = (id, commentId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await dispatch(deleteLike(id, commentId));
    return null;
  }
};

const initialState = { user: null };

export default function likesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_LIKES:
      newState = { ...state};
      newState = {...action.payload}
      return newState;
    case GET_ALL_LIKES_COMMENT:
        newState = { ...state };
        newState[action.payload.commentId] = {...newState[action.payload.commentId] ,...action.payload.data};
        return Object.assign({}, newState);
    case CREATE_LIKE:
      newState = { ...state };
      newState[action.payload.commentId] = {...newState[action.payload.commentId] , ...action.payload.data}
      return Object.assign({}, newState);
    case DELETE_LIKE:
      newState = { ...state };
      delete newState[action.payload.commentId][action.payload.id];
      return Object.assign({}, newState);
    default:
      return state;
  }
}

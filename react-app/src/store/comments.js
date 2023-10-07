const CREATE_APPLAUSE_COMMENT = "comments/CREATE_APPLAUSE_COMMENT";
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
const UPDATE_APPLAUSE_COMMENT = "comments/UPDATE_APPLAUSE_COMMENT";
const DELETE_APPLAUSE_COMMENT = "comments/DELETE_APPLAUSE_COMMENT";

const createApplauseComment = (data, postId) => ({
  type: CREATE_APPLAUSE_COMMENT,
  payload: {
    data: data,
    postId: postId
  }
});

const getAllComments = (data, postId) => ({
  type: GET_ALL_COMMENTS,
  payload: {
    data: data,
    postId: postId
  }
});

const updateApplauseComment = (data, postId) => ({
  type: UPDATE_APPLAUSE_COMMENT,
  payload: {
    data: data,
    postId: postId
  }
});

const deleteApplauseComment = (commentId, postId) => ({
  type: DELETE_APPLAUSE_COMMENT,
  payload: {
    commentId: commentId,
    postId: postId
  }
});

export const createApplauseCommentThunk = (comment) => async (dispatch) => {
  const { userId, username, commentContent, postId } = comment;
  const response = await fetch(`/api/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      username,
      commentContent,
      postId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    const normalizedData = {}
    normalizedData[data.id]=data
    await dispatch(createApplauseComment(normalizedData, postId));
    return null;
  } else {
    return {
      errors: "Unable To Update Comment At This Time, Please Try Again Later",
    };
  }
};

export const getAllCommentsThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${postId}`);

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach((comment) => {
      normalizedData[comment.id] = comment;
    });
    await dispatch(getAllComments(normalizedData, postId));
    return null;
  }
  else {
    return {
      errors: "Unable To Fetch Comment Data, Please Try Again Later",
    };
  }
};

export const updateApplauseCommentThunk = (comment) => async (dispatch) => {
  const { id, commentContent, userId, username, postId } = comment;
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      commentContent,
      userId,
      username,
      postId,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const normalizedData = {};
    normalizedData[data.id] = data
    await dispatch(updateApplauseComment(normalizedData, postId));
    return null;
  } else {
    return {
      errors: "Unable To Update Comment At This Time, Please Try Again Later",
    };
  }
};

export const deleteApplauseCommentThunk = (commentId, postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await dispatch(deleteApplauseComment(commentId, postId));
    return null;
  } else {
    return {
      errors:
        "Unable To Delete This Comment At This Time, Please Try Again Later.",
    };
  }
};

const initialState = { byPosts: null };

export default function commentsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_COMMENTS:
        newState = {...state};
        newState[action.payload.postId] = action.payload.data;
        return newState;
    case CREATE_APPLAUSE_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload.postId]= {...newState[action.payload.postId], ...action.payload.data}
      return newState;
    case UPDATE_APPLAUSE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.payload.postId][action.payload.data.id]
      newState[action.payload.postId]= {...newState[action.payload.postId], ...action.payload.data}
      return newState;
    case DELETE_APPLAUSE_COMMENT:
      newState = {...state};
      delete newState[action.payload.postId][action.payload.commentId];
      newState[action.payload.postId] = {...newState[action.payload.postId]}
      return newState;
    default:
      return state;
  }
}

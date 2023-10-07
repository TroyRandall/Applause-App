const GET_ALL_USERS = "users/GET_ALL_USERS";

const getAllUsers = (normalizedData) => ({
  type: GET_ALL_USERS,
  payload: normalizedData,
});

export const getAllUsersThunk = () => async (dispatch) => {
  const response = await fetch("/api/users/");
  if (response.ok) {
    const data = await response.json();
    let i = 0;
    let normalizedData = {};
    data.users.forEach((user) => {
      if (i < 3) {
        normalizedData[user.id] = user;
        i++;
      }
    });
    await dispatch(getAllUsers(normalizedData));
    return null;
  } else {
    return { errors: "Unable To Grab Users Data, Please Try Again Later" };
  }
};

const initialState = {};

export default function allUsersReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
      newState = Object.assign({}, state);
      newState =  action.payload;
      return newState;
    default:
      return state;
  }
}

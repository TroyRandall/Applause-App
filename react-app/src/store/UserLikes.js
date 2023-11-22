const GET_ALL_LIKES = 'likes/GET_ALL_LIKES';
const CREATE_LIKE = 'likes/CREATE_LIKE';
const DELETE_LIKE = 'likes/DELETE_LIKE';

const getAllLikes = (data) => ({
    type: GET_ALL_LIKES,
    payload: data
})

const createLike = (data) => ({
    type: CREATE_LIKE,
    payload: data
})

const deleteLike = (id) => ({
    type: DELETE_LIKE,
    payload: id
})

export const getAllLikesThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/likes/`);

    if(response.ok){
        let newData = {};
        const data = await response.json();
        data.forEach( like => {
            newData[like?.id] = like;
        })
        await dispatch(getAllLikes(newData));
        return null;
    }
}

export const createLikeThunk = (Like) => async (dispatch) => {
    const response = await fetch(`/api/likes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.Stringify(Like)
    })

    if(response.ok){
        const data = await response.json();
        await dispatch(createLike(data));
        return null;
    }
}

export const deleteLikeThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/likes/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        await dispatch(deleteLike(id))
        return null
    }
}

const initialState = {user: null}

export default function likesReducer (state=initialState, action){
    let newState;
    switch(action.type){
        case GET_ALL_LIKES:
            newState = {...state};
            newState = {...action.payload}
            return newState;
        case CREATE_LIKE:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_LIKE:
            newState = {...state}
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }

}

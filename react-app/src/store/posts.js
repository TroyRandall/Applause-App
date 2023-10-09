const CREATE_APPLAUSE_POST='posts/CREATE_APPLAUSE_POST'
const GET_APPLAUSE_POST = 'posts/GET_APPLAUSE_POST'
const UPDATE_APPLAUSE_POST = 'posts/UPDATE_APPLAUSE_POST'
const DELETE_APPLAUSE_POST = 'posts/DELETE_APPLAUSE_POST'

const getApplausePosts = (data) => ({
    type: GET_APPLAUSE_POST,
    payload: data
})

const createApplausePost = (data) => ({
    type: CREATE_APPLAUSE_POST,
    payload: data
})

const updateApplausePost = (data) => ({
    type: UPDATE_APPLAUSE_POST,
    payload: data,
})

const deleteApplausePost = (id) => ({
    type: DELETE_APPLAUSE_POST,
    payload: id
})


export const getApplausePostsThunk = (id) => async(dispatch) => {
    if(id){
        const response = await fetch(`/api/posts/${id}`)

    if(response.ok){
        const data = await response.json()
        const normalizedData = {};
        data.forEach((post) => {
            normalizedData[post.id]=post;
        })
        console.log(normalizedData)
        await dispatch(getApplausePosts(normalizedData));
        return null;
    }
}  else {
    const response = await fetch('api/posts/')

    if(response.ok){
        const data = await response.json()
        const normalizedData = {};
        data.forEach((post) => {
            normalizedData[post.id]=post;
        })
        console.log(normalizedData)
        await dispatch(getApplausePosts(normalizedData));
        return null;
}}}

export const updateApplausePostThunk = (updatedPost) => async (dispatch) => {
    const {id, userId, username, postTitle, postContent, imageSrc, musicSrc } = updatedPost;
    const response = await fetch(`/api/posts/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            id,
            userId,
            username,
            postTitle,
            postContent,
            imageSrc,
            musicSrc
        })
    })

    if(response.ok) {
        const data = await response.json();

        dispatch(updateApplausePost(data));
        return null;
    }
}
export const createApplausePostThunk = (post) => async (dispatch) => {
    const {userId, username, postTitle, postContent, imageSrc, musicSrc } = post;
    const response = await fetch(`/api/posts/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            userId,
            username,
            postTitle,
            postContent,
            imageSrc,
            musicSrc
        })
    })

    if(response.ok){
        const data = await response.json()
        await dispatch(createApplausePost(data));
        return null
    }
}

export const deleteApplausePostThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })

    if(response.ok){
        const data = await response.json();
        await dispatch(deleteApplausePost(id));
        return null;
    } else {
        const data = await response.json();
        return data;
    }
}

function deepCopy(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[entry[0]] = deepCopy(entry[1]);
            });
            return result;
        }
    } else {
        return value;
    }
}
const initialState = {byUser: null};

export default function postsReducer(state=initialState, action) {
    let newState;
    switch(action.type) {
        case GET_APPLAUSE_POST:
            newState={...state}
            newState= {...action.payload}
            return newState;
        case CREATE_APPLAUSE_POST:
            newState = Object.assign({}, state)
            newState[action.payload.id]=action.payload;
            return newState;
        case UPDATE_APPLAUSE_POST:
            newState = Object.assign({}, state)
            newState[action.payload.id]=action.payload;
            return newState;
        case DELETE_APPLAUSE_POST:
            newState = Object.assign({}, state)
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
}

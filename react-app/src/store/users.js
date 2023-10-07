const GET_USER_BY_ID = 'users/GET_USER_BY_ID';


const getUserById = (user) => ({
    type: GET_USER_BY_ID,
    payload: user
})


export const getUserByIdThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/users/${id}`)

    if(response.ok) {
        const data = await response.json();
        dispatch(getUserById(data));
        return null;
    }
    else {
        return {'error': 'Unable To Locate User At This Time, Please Try Again Later'};
    }
    }



    const initialState = {info: null }

    export default function usersInfoReducer (state = initialState, action) {
        let newState;
        switch(action.type) {
            case GET_USER_BY_ID:
                newState = Object.assign({}, state)
                newState = {info: action.payload};
                return newState;
            default:
                return state;
        }
    }

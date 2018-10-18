import "isomorphic-fetch";

const FETCH_USERS_REQUEST = Symbol("FETCH_USERS_REQUEST");
const FETCH_USERS_FAILURE = Symbol("FETCH_USERS_FAILURE");
const FETCH_USERS_SUCCESS = Symbol("FETCH_USERS_SUCCESS");

export const fetchUsersRequest = () => ( { type: FETCH_USERS_REQUEST } )
export const fetchUsersFailure = () => ( { type: FETCH_USERS_FAILURE } )
export const fetchUsersSuccess = (users) => ( { type: FETCH_USERS_SUCCESS, users } )

export const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUsersRequest());

    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const json = await response.json();
        const users = json.results.map( ({picture}) => ({picture: picture.medium}) );
        return dispatch(fetchUsersSuccess(users));
    } catch (e) {
        dispatch(fetchUsersFailure())
    }
}

const initialState = {
    users: [],
    isFetching: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {...state, isFetching: true}
        case FETCH_USERS_FAILURE:
            return {...state, isFetching: false }
        case FETCH_USERS_SUCCESS:
            return {...state, isFetching: false, users: [...state.users, ...action.users] }
        default:
            return state;
    }
}
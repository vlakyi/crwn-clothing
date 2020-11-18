import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: { ...action.payload, error_type: 'signin' }
            }
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: { ...action.payload, error_type: 'signup' }
            }
        case UserActionTypes.CLEAN_USER_ERROR:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
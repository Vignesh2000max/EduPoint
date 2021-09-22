import * as ActionTypes from './ActionTypes';

export const Classes = (state = {
        isLoading: false,
        classes: [],
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CLASS_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.FETCH_CLASS_SUCESS:
            return{ ...state,
                isLoading: false,
                errMess: '',
                classes: action.classes
            };
        case ActionTypes.FETCH_CLASS_FAILED:
            return{ ...state,
                isLoading: false,
                errMess: action.error
            };
        case ActionTypes.LOGOUT_REQUEST: 
            return{
                isLoading: false,
                classes: [],
                errMess: null
            }
        default:
            return state
    }
}
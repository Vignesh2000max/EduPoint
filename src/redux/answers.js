import * as ActionTypes from './ActionTypes';

export const Answers = (state = {
        isLoading: false,
        answers: [],
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ANSWERS_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.FETCH_ANSWERS_SUCCESS:
            return{ ...state,
                isLoading: false,
                errMess: '',
                answers: action.answers
            };
        case ActionTypes.FETCH_ANSWERS_FAILED:
            return{ ...state,
                isLoading: false,
                errMess: action.error
            };
        case ActionTypes.LOGOUT_REQUEST: 
            return{
                isLoading: false,
                answers: [],
                errMess: null
            }
        default:
            return state
    }
}
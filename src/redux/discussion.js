import * as ActionTypes from './ActionTypes';

export const Discuss = (state = {
        isLoading: false,
        questions: [],
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_QUESTION_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.ADD_QUESTION_SUCESS:
            return{ ...state,
                isLoading: false,
                questions: action.questions,
                errMess: ''
            };
        case ActionTypes.ADD_QUESTION_FAILED:
            return{ ...state,
                isLoading: false,
                errMess: action.error
            };
        case ActionTypes.LOGOUT_REQUEST: 
            return{...state,
                isLoading: false,
                questions: [],
                errMess: null
            };
        default:
            return state
    }
}
import * as ActionTypes from './ActionTypes';

export const Subjects = (state = {
        isLoading: false,
        subjects: [],
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SUBJ_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.FETCH_SUBJ_SUCESS:
            return{ ...state,
                isLoading: false,
                subjects: action.subjects,
                errMess: ''
            };
        case ActionTypes.FETCH_SUBJ_FAILED:
            return{ ...state,
                isLoading: false,
                errMess: action.error
            };
        case ActionTypes.LOGOUT_REQUEST: 
            return{
                isLoading: false,
                subjects: [],
                errMess: null
            }
        default:
            return state
    }
}
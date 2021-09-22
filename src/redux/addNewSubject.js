import * as ActionTypes from './ActionTypes';

export const AddNewSub = (state = {
    isLoading: false,
    added:false,
    subjId: null,
    errMess: null
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_SUBJ_REQUEST:
        return{ ...state,
            isLoading: true,
            added: false
        };
    case ActionTypes.ADD_SUBJ_SUCESS:
        return{ ...state,
            isLoading: false,
            added: true,
            errMess: '',
            subjId: action.subjId
        };
    case ActionTypes.ADD_SUBJ_FAILED:
        return{ ...state,
            isLoading: false,
            isAuthenticated: false,
            errMess: action.error
        };
    default:
        return state
}
}
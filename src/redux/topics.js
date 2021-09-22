import * as ActionTypes from './ActionTypes';

export const Topics = (state = {
        isLoading: false,
        topics: [],
        classID: null,
        classTitle: null,
        classDescription:null,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_TOPICS_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.FETCH_TOPICS_SUCESS:
            return{ ...state,
                isLoading: false,
                topics: action.topics,
                classID: action.classID,
                classTitle: action.classTitle,
                classDescription: action.classDescription,
                errMess: ''
            };
        case ActionTypes.FETCH_TOPICS_FAILED:
            return{ ...state,
                isLoading: false,
                errMess: action.error
            };
        case ActionTypes.LOGOUT_REQUEST: 
            return{
                isLoading: false,
                topics: [],
                classID: null,
                classTitle: null,
                classDescription: null,
                errMess: null
            };
        default:
            return state
    }
}
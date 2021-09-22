import * as ActionTypes from './ActionTypes';

export const EnrolledCourses = (state = {
        isLoading: false,
        courses: [],
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ENROLLED_COURSES_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.FETCH_ENROLLED_COURSES_SUCESS:
            return{ ...state,
                isLoading: false,
                errMess: '',
                courses: action.courses
            };
        case ActionTypes.FETCH_ENROLLED_COURSES_FAILED:
            return{ ...state,
                isLoading: false,
                errMess: action.error
            };
        case ActionTypes.LOGOUT_REQUEST: 
            return{
                isLoading: false,
                courses: [],
                errMess: null
            }
        default:
            return state
    }
}
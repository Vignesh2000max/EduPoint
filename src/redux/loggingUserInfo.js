import * as ActionTypes from './ActionTypes';

export const LoggingUserInfo = (state = {isLogging: false,
                                    loggingSuccess: false,
                                    errMess: null,
                                    isAuthenticated: false,
                                    uId: null,
                                    displayName: null,
                                    userType: null,
                                    photoUrl: null}, action ) => {
    
        switch(action.type){
            case ActionTypes.REQ_LOG_USER_INFO: 
                return{
                    ...state,
                    isLogging: true
                };
            case ActionTypes.LOG_USER_INFO_SUCCESS: 
                return{
                    ...state,
                    isLogging: false,
                    loggingSuccess: true,
                    errMess: '',
                    isAuthenticated: true,
                    uId: action.uId,
                    displayName: action.displayname,
                    userType: action.usertype,
                    photoUrl: action.photoUrl
                };
            case ActionTypes.LOG_USER_INFO_FAILURE: 
                return{
                    ...state,
                    isLogging: false,
                    loggingSuccess: false,
                    errMess: action.error
                };
            case ActionTypes.LOGOUT_REQUEST: 
                return{
                    isLogging: false,
                    loggingSuccess: false,
                    errMess: null,
                    isAuthenticated: false,
                    uId: null,
                    displayName: null,
                    userType: null,
                    photoUrl: null
                };

            default:
                return state;
        } 
}
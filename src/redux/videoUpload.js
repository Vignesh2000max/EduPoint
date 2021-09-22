import * as ActionTypes from './ActionTypes';

export const VideoUpload = (state = {
        isLoading: false,
    }, action) => {
    switch (action.type) {
        case ActionTypes.UPLOAD_VIDEO_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.UPLOAD_VIDEO_SUCCESS:
            return{ ...state,
                isLoading: false,
            };
        default:
            return state
    }
}
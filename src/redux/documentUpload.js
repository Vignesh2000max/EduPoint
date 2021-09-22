import * as ActionTypes from './ActionTypes';

export const DocUpload = (state = {
        isLoading: false,
    }, action) => {
    switch (action.type) {
        case ActionTypes.UPLOAD_DOC_REQUEST:
            return{ ...state,
                isLoading: true,
            };
        case ActionTypes.UPLOAD_DOC_SUCCESS:
            return{ ...state,
                isLoading: false,
            };
        default:
            return state
    }
}
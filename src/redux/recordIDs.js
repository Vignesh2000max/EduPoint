import * as ActionTypes from './ActionTypes';

export const RecordIds = (state = {
        cid: null,
        qstId: null,
        ansId: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.RECORD_CLASSID:
            return{ ...state,
                cid: action.cid,
            }; 
        case ActionTypes.RECORD_QSTID:
            return{ ...state,
                qstId: action.qstId,
            }; 
        case ActionTypes.RECORD_ANSID:
            return{ ...state,
                ansId: action.ansId,
            }; 
        case ActionTypes.LOGOUT_REQUEST: 
            return{...state,
                cid: null,
                qstId: null,
                ansId: null
        };
        default:
            return state
    }
}
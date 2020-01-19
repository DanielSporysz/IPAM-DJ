import {RECEIVE_LOCATION_LIST} from "../actions/types"

export const fetchReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LOCATION_LIST:
            return {
                ...state,
                LocList:action.LocList,
                LocListReceivedAt:action.LocListReceivedAt,
                isLocListReady:true
            };
        default:
            return state;
    }
};
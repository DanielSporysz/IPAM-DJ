import {__DEV__FETCH_LOCATION_LIST, FETCH_LOCATION_LIST} from "../actions/types"

export const fetchReducer = (state = {}, action) => {
    switch (action.type) {
        case __DEV__FETCH_LOCATION_LIST:
        case FETCH_LOCATION_LIST:
            return {
                ...state,
                LocList:action.LocList,
                isLocListReady:true
            };
        default:
            return state;
    }
};
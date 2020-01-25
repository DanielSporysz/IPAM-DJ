import {RECEIVE_DEVICE_LIST, RECEIVE_LOCATION_LIST} from "../actions/types"

export const fetchReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LOCATION_LIST:
            return {
                ...state,
                locList:action.locList,
                locListReceivedAt:action.locListReceivedAt,
                isLocListReady:true
            };
        case RECEIVE_DEVICE_LIST:
            return {
                ...state,
                deviceList:action.deviceList,
                deviceListReceivedAt:action.deviceListReceivedAt,
                isDeviceListReady:true
            };
        default:
            return state;
    }
};
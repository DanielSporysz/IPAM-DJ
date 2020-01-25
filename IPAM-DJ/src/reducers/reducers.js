import {
    RECEIVE_DEVICE_LIST,
    RECEIVE_LOCATION_LIST,
    RECEIVE_NAT_LIST,
    RECEIVE_RACK_LIST, RECEIVE_SUBNET_LIST,
    RECEIVE_VLAN_LIST
} from "../actions/types"

export const fetchReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LOCATION_LIST:
            return {
                ...state,
                locList: action.items,
                locListReceivedAt: action.receivedAt,
                isLocListReady: true
            };
        case RECEIVE_DEVICE_LIST:
            return {
                ...state,
                deviceList: action.items,
                deviceListReceivedAt: action.receivedAt,
                isDeviceListReady: true
            };
        case RECEIVE_NAT_LIST:
            return {
                ...state,
                NATList: action.items,
                NATListReceivedAt: action.receivedAt,
                isNATListReady: true
            };
        case RECEIVE_VLAN_LIST:
            return {
                ...state,
                VLANList: action.items,
                VLANListReceivedAt: action.receivedAt,
                isVLANListReady: true
            };
        case RECEIVE_RACK_LIST:
            return {
                ...state,
                rackList: action.items,
                rackListReceivedAt: action.receivedAt,
                isRackListReady: true
            };
        case RECEIVE_SUBNET_LIST:
            return {
                ...state,
                subnetList: action.items,
                subnetListReceivedAt: action.receivedAt,
                isSubnetListReady: true
            };
        default:
            return state;
    }
};
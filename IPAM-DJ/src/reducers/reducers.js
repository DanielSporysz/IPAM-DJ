import {
    RECEIVE_DEVICE_LIST,
    INVALIDATE_DEVICE_LIST,

    RECEIVE_LOCATION_LIST,
    INVALIDATE_LOCATION_LIST,

    RECEIVE_NAT_LIST,
    INVALIDATE_NAT_LIST,

    RECEIVE_RACK_LIST,
    INVALIDATE_RACK_LIST,

    RECEIVE_SUBNET_LIST,
    INVALIDATE_SUBNET_LIST,

    RECEIVE_VLAN_LIST,
    INVALIDATE_VLAN_LIST,

    RECEIVE_NAMESERVER_LIST,
    INVALIDATE_NAMESERVER_LIST,
} from "../actions/types";

export const fetchReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LOCATION_LIST:
            return {
                ...state,
                locList: action.items,
                locListReceivedAt: action.receivedAt,
                isLocListReady: true
            };
        case INVALIDATE_LOCATION_LIST:
            return {
                ...state,
                locList: null,
                isLocListReady: false
            };

        case RECEIVE_DEVICE_LIST:
            return {
                ...state,
                deviceList: action.items,
                deviceListReceivedAt: action.receivedAt,
                isDeviceListReady: true
            };
        case INVALIDATE_DEVICE_LIST:
            return {
                ...state,
                deviceList: null,
                isDeviceListReady: false
            };

        case RECEIVE_NAT_LIST:
            return {
                ...state,
                NATList: action.items,
                NATListReceivedAt: action.receivedAt,
                isNATListReady: true
            };
        case INVALIDATE_NAT_LIST:
            return {
                ...state,
                NATList: null,
                isNATListReady: false
            };

        case RECEIVE_VLAN_LIST:
            return {
                ...state,
                VLANList: action.items,
                VLANListReceivedAt: action.receivedAt,
                isVLANListReady: true
            };
        case INVALIDATE_VLAN_LIST:
            return {
                ...state,
                VLANList: null,
                isVLANListReady: false
            };

        case RECEIVE_RACK_LIST:
            return {
                ...state,
                rackList: action.items,
                rackListReceivedAt: action.receivedAt,
                isRackListReady: true
            };
        case INVALIDATE_RACK_LIST:
            return {
                ...state,
                rackList: null,
                isRackListReady: false
            };

        case RECEIVE_SUBNET_LIST:
            return {
                ...state,
                subnetList: action.items,
                subnetListReceivedAt: action.receivedAt,
                isSubnetListReady: true
            };
        case INVALIDATE_SUBNET_LIST:
            return {
                ...state,
                subnetList: null,
                isSubnetListReady: false
            };

        case RECEIVE_NAMESERVER_LIST:
            return {
                ...state,
                nameServerList: action.items,
                nameServerListReceivedAt: action.receivedAt,
                isNameServerListReady: true
            };
        case INVALIDATE_NAMESERVER_LIST:
            return {
                ...state,
                nameServerList: null,
                isNameServerListReady: false
            };
        default:
            return state;
    }
};
import firebase from "firebase";
import {
    INVALIDATE_LOCATION_LIST,
    INVALIDATE_DEVICE_LIST,
    INVALIDATE_VLAN_LIST,
    INVALIDATE_NAMESERVER_LIST,
    INVALIDATE_SUBNET_LIST,
    INVALIDATE_RACK_LIST,
    INVALIDATE_NAT_LIST
} from "./types";

export const createLoc = (data) => dispatch => {
    dispatch(createItem(data, "locations", INVALIDATE_LOCATION_LIST))
};

export const createDevice = (data) => dispatch => {
    dispatch(createItem(data, "devices", INVALIDATE_DEVICE_LIST))
};

export const createVLAN = (data) => dispatch => {
    dispatch(createItem(data, "vlan", INVALIDATE_VLAN_LIST))
};

export const createNameServer = (data) => dispatch => {
    dispatch(createItem(data, "nameservers", INVALIDATE_NAMESERVER_LIST))
};

export const createSubNet = (data) => dispatch => {
    dispatch(createItem(data, "subnets", INVALIDATE_SUBNET_LIST))
};

export const createRack = (data) => dispatch => {
    dispatch(createItem(data, "racks", INVALIDATE_RACK_LIST))
};

export const createNAT = (data) => dispatch => {
    dispatch(createItem(data, "nat", INVALIDATE_NAT_LIST))
};

const createItem = (data, tableName, type) => dispatch => {
    firebase.firestore()
        .collection(tableName)
        .add(data)
        .then(dispatch({
            type: type
        }));
};
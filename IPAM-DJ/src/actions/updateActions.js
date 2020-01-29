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

export const updateLoc = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "locations", INVALIDATE_LOCATION_LIST));
};

export const updateDevice = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "devices", INVALIDATE_DEVICE_LIST));
};

export const updateVLAN = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "vlan", INVALIDATE_VLAN_LIST));
};

export const updateNameServer = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "nameservers", INVALIDATE_NAMESERVER_LIST));
};

export const updateSubnet = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "subnets", INVALIDATE_SUBNET_LIST));
};

export const updateRack = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "racks", INVALIDATE_RACK_LIST));
};

export const updateNAT = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "nat", INVALIDATE_NAT_LIST));
};
const updateItem = (id, data, tableName, type) => dispatch => {
    firebase.firestore()
        .collection(tableName)
        .doc(id)
        .set(data)
        .then(dispatch({
            type: type
        }));
};
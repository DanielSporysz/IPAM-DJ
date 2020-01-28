import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST, INVALIDATE_DEVICE_LIST, INVALIDATE_VLAN_LIST} from "./types";

export const createLoc = (data) => dispatch => {
    dispatch(createItem(data, "locations", INVALIDATE_LOCATION_LIST))
};

export const createDevice = (data) => dispatch => {
    dispatch(createItem(data, "devices", INVALIDATE_DEVICE_LIST))
};

export const createVLAN = (data) => dispatch => {
    dispatch(createItem(data, "vlan", INVALIDATE_VLAN_LIST))
};

const createItem = (data, tableName, type) => dispatch => {
    firebase.firestore()
        .collection(tableName)
        .add(data)
        .then(dispatch({
            type: type
        }));
};
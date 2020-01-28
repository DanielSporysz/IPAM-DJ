import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST, INVALIDATE_DEVICE_LIST, INVALIDATE_VLAN_LIST} from "./types";

export const updateLoc = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "locations", INVALIDATE_LOCATION_LIST));
};

export const updateDevice = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "devices", INVALIDATE_DEVICE_LIST));
};
export const updateVLAN = (id, data) => dispatch => {
    dispatch(updateItem(id, data, "vlan", INVALIDATE_VLAN_LIST));
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
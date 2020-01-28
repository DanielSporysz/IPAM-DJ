import firebase from "firebase";
import {
    INVALIDATE_LOCATION_LIST,
    INVALIDATE_DEVICE_LIST,
    INVALIDATE_VLAN_LIST,
    INVALIDATE_NAMESERVER_LIST
} from "./types";

export const deleteLoc = (id) => dispatch => {
    dispatch(deleteItem(id, "locations", INVALIDATE_LOCATION_LIST));
};

export const deleteDevice = (id) => dispatch => {
    dispatch(deleteItem(id, "devices", INVALIDATE_DEVICE_LIST));
};

export const deleteVLAN = (id) => dispatch => {
    dispatch(deleteItem(id, "vlan", INVALIDATE_VLAN_LIST));
};

export const deleteNameServer = (id) => dispatch => {
    dispatch(deleteItem(id, "nameservers", INVALIDATE_NAMESERVER_LIST));
};

const deleteItem = (id, tableName, type) => dispatch => {
    firebase.firestore()
        .collection(tableName)
        .doc(id)
        .delete()
        .then(dispatch({
            type: type
        }));
};
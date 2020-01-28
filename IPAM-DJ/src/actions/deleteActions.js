import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST, INVALIDATE_DEVICE_LIST} from "./types";

export const deleteLoc = (locID) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .doc(locID)
        .delete()
        .then(dispatch({
            type: INVALIDATE_LOCATION_LIST
        }));
};

export const deleteDevice = (deviceID) => dispatch => {
    firebase.firestore()
        .collection("devices")
        .doc(deviceID)
        .delete()
        .then(dispatch({
            type: INVALIDATE_DEVICE_LIST
        }));
};
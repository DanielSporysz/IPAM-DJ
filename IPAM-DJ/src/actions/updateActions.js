import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST, INVALIDATE_DEVICE_LIST} from "./types";

export const updateLoc = (locID, locData) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .doc(locID)
        .set(locData)
        .then(dispatch({
            type: INVALIDATE_LOCATION_LIST
        }));
};

export const updateDevice = (devID, devData) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .doc(devID)
        .set(devData)
        .then(dispatch({
            type: INVALIDATE_DEVICE_LIST
        }));
};
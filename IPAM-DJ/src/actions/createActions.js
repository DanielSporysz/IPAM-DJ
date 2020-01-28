import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST, INVALIDATE_DEVICE_LIST} from "./types";

export const createLoc = (locData) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .add(locData)
        .then(dispatch({
            type: INVALIDATE_LOCATION_LIST
        }));
};

export const createDevice = (deviceData) => dispatch => {
    firebase.firestore()
        .collection("devices")
        .add(deviceData)
        .then(dispatch({
            type: INVALIDATE_DEVICE_LIST
        }));
};
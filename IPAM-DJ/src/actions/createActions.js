import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST} from "./types";

export const createLoc = (locData) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .add(locData)
        .then(dispatch({
            type: INVALIDATE_LOCATION_LIST
        }));
};
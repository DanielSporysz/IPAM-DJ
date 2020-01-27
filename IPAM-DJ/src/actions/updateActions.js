import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST} from "./types";

export const updateLoc = (locID, locData) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .doc(locID)
        .set(locData)
        .then(dispatch({
            type:INVALIDATE_LOCATION_LIST
        }));
};
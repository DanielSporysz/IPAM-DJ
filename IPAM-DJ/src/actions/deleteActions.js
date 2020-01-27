import firebase from "firebase";
import {INVALIDATE_LOCATION_LIST} from "./types";

export const deleteLoc = (locID) => dispatch => {
    firebase.firestore()
        .collection("locations")
        .doc(locID)
        .delete()
        .then(dispatch({
            type: INVALIDATE_LOCATION_LIST
        }));
};
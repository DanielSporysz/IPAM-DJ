import {RECEIVE_LOCATION_LIST} from "./types"

const MAX_AGE = 30 * 1000;

export const fetchLocListIfNeeded = () => (dispatch, getState) => {
    if (shouldLocListUpdate(getState)) {
        dispatch(fetchLocList());
    }
};

const shouldLocListUpdate = getState => {
    const {LocListReceivedAt} = getState().fetchReducer;
    return !LocListReceivedAt || new Date() - LocListReceivedAt > MAX_AGE;
};


export const fetchLocList = () => dispatch => {
    dispatch(__mockUp__fetchLocationList());
    /*fetch('fajny url')
        .then(res => res.json())
        .then(payload => dispatch(receiveNATList(payload)));*/
};

export const __mockUp__fetchLocationList = () => dispatch => {
    const payload = {
        "abcdefgh_ID": {"about": "Czerwono biała", "name": "Polska"},
        "xyzabcdf_ID": {"about": "Oddział 3", "name": "Factorio"},
    };

    dispatch(receiveLocList(payload));
};

const receiveLocList = payload => dispatch => {
    dispatch({
        type: RECEIVE_LOCATION_LIST,
        LocList: payload,
        LocListReceivedAt: Date.now()
    });
};

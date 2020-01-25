import {RECEIVE_DEVICE_LIST, RECEIVE_LOCATION_LIST} from "./types"

const MAX_AGE = 30 * 1000;

/*
*
* Should update checking
 */

export const fetchDeviceListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.deviceListReceivedAt)) {
        dispatch(fetchDeviceList());
    }
};

export const fetchLocListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.locListReceivedAt)) {
        dispatch(fetchLocList());
    }
};

const shouldListUpdate = (updatedAt) => {
    return !updatedAt || new Date() - updatedAt > MAX_AGE;
};

/*
*
* Fetch methods
 */

export const fetchDeviceList = () => dispatch => {
    dispatch(__mockUp__fetchDeviceList());
    /*fetch('fajny url')
        .then(res => res.json())
        .then(payload => dispatch(receiveNATList(payload)));*/
};

export const fetchLocList = () => dispatch => {
    dispatch(__mockUp__fetchLocationList());
};

/*
*
* Dispatch preparation
 */
const receiveDeviceList = payload => dispatch => {
    dispatch({
        type: RECEIVE_DEVICE_LIST,
        deviceList: payload,
        deviceListReceivedAt: Date.now()
    });
};

const receiveLocList = payload => dispatch => {
    dispatch({
        type: RECEIVE_LOCATION_LIST,
        locList: payload,
        locListReceivedAt: Date.now()
    });
};


/*
*
* Mock ups
 */
export const __mockUp__fetchDeviceList = () => dispatch => {
    const payload = {
        "12j3b12_device_ID": {
            "about": "To jest device",
            "gateway": false,
            "hostname": "jakaś nazwa hosta",
            "ip": "localhost",
            "loc": {
                "position": 0,
                "rack": "id racka",
                "size": 2
            },
            "mac": "AA:BB:CC:DD:FF",
            "nat": {
                "id": "asdahsasjhas_nat_id",
                "owner": "Daniel",
                "subnet": "iadasdasdas_subnet_id"
            }
        }
    };

    dispatch(receiveDeviceList(payload));
};

export const __mockUp__fetchLocationList = () => dispatch => {
    const payload = {
        "abcdefgh_ID": {"about": "Czerwono biała", "name": "Polska"},
        "xyzabcdf_ID": {"about": "Oddział 3", "name": "Factorio"},
    };

    dispatch(receiveLocList(payload));
};
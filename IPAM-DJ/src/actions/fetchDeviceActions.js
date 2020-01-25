import {RECEIVE_DEVICE_LIST} from "./types"

const MAX_AGE = 30 * 1000;

export const fetchDeviceListIfNeeded = () => (dispatch, getState) => {
    if (shouldDeviceListUpdate(getState)) {
        dispatch(fetchDeviceList());
    }
};

const shouldDeviceListUpdate = getState => {
    const {deviceListReceivedAt} = getState().fetchReducer;
    return !deviceListReceivedAt || new Date() - deviceListReceivedAt > MAX_AGE;
};


export const fetchDeviceList = () => dispatch => {
    dispatch(__mockUp__fetchDeviceList());
    /*fetch('fajny url')
        .then(res => res.json())
        .then(payload => dispatch(receiveNATList(payload)));*/
};

export const __mockUp__fetchDeviceList = () => dispatch => {
    const payload = {
        "12j3b12_device_ID": {
            "about": "To jest device",
            "gateway": false,
            "hostname":"jakaś nazwa hosta",
            "ip":"localhost",
            "loc":{"position":0,
                "rack":"id racka",
                "size":2},
            "mac":"AA:BB:CC:DD:FF",
            "nat":{
                "id":"asdahsasjhas_nat_id",
                "owner":"Daniel",
                "subnet":"iadasdasdas_subnet_id"
            }
        }
    };

    dispatch(receiveDeviceList(payload));
};

const receiveDeviceList = payload => dispatch => {
    dispatch({
        type: RECEIVE_DEVICE_LIST,
        deviceList: payload,
        deviceListReceivedAt: Date.now()
    });
};

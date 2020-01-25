import {RECEIVE_DEVICE_LIST, RECEIVE_LOCATION_LIST, RECEIVE_NAT_LIST, RECEIVE_SUBNET_LIST, RECEIVE_RACK_LIST, RECEIVE_VLAN_LIST} from "./types"
import firebase from "firebase";

const MAX_AGE = 30 * 1000;

/*
*
* Should update check methods
 */

export const fetchDeviceListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.deviceList, getState().fetchReducer.deviceListReceivedAt)) {
        dispatch(fetchDeviceList());
    }
};

export const fetchLocListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.LocList, getState().fetchReducer.locListReceivedAt)) {
        dispatch(fetchLocList());
    }
};

export const fetchNATListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.NATList, getState().fetchReducer.NATListReceivedAt)) {
        dispatch(fetchNATList());
    }
};

export const fetchVLANListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.VLANList, getState().fetchReducer.VLANListReceivedAt)) {
        dispatch(fetchVLANList());
    }
};

export const fetchRackListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.rackList, getState().fetchReducer.rackListReceivedAt)) {
        dispatch(fetchRackList());
    }
};

export const fetchSubnetListIfNeeded = () => (dispatch, getState) => {
    if (shouldListUpdate(getState().fetchReducer.subnetList, getState().fetchReducer.subnetListReceivedAt)) {
        dispatch(fetchSubnetList());
    }
};

const shouldListUpdate = (items, updatedAt) => {
    return items || !updatedAt || new Date() - updatedAt > MAX_AGE;
};

/*
*
* Fetch methods
 */

const fetchDeviceList = () => dispatch => {
    dispatch(makeRequest('devices', RECEIVE_DEVICE_LIST));
};

const fetchLocList = () => dispatch => {
    dispatch(makeRequest('locations', RECEIVE_LOCATION_LIST));
};

const fetchNATList = () => dispatch => {
    dispatch(makeRequest('nat', RECEIVE_NAT_LIST));
};

const fetchSubnetList = () => dispatch => {
    dispatch(makeRequest('subnets', RECEIVE_SUBNET_LIST));
};

const fetchRackList = () => dispatch => {
    dispatch(makeRequest('racks', RECEIVE_RACK_LIST));
};

const fetchVLANList = () => dispatch => {
    dispatch(makeRequest('vlan', RECEIVE_VLAN_LIST));
};

const makeRequest = (src, actionType) => dispatch => {
    firebase.firestore()
        .collection(src)
        .get()
        .then(snapshot => {
            dispatch(receiveItems(snapshot, actionType))
        });
};

const receiveItems = (snapshot, actionType) => dispatch => {
    let items = {};
    snapshot.forEach(doc => {
        let item = doc.data();
        item["id"] = doc.id;

        items[doc.id] = item;
    });

    dispatch({
        type: actionType,
        items: items,
        receivedAt: Date.now()
    });
};
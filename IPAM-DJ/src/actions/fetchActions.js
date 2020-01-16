import {__DEV__FETCH_LOCATION_LIST} from "./types"

export const __dev__fetchLocationList = () => dispatch => {
    const mockUp = {
        "asasdajwqndajsd_ID":{"about":"Ta w Europie lol", "name":"Polska"},
        "adazwefdsfsdasd_ID":{"about":"Fajna gra", "name":"Factorio"},
    };

    dispatch({
        type: __DEV__FETCH_LOCATION_LIST,
        LocList:mockUp
    });
};

/*
export const fetchNATList = () => dispatch => {
    throw new Error("fetchNATList: IT'S NOT IMPLEMENTED YET");
    fetch('fajny url')
        .then(res => res.json())
        .then(payload => dispatch(receiveNATList(payload)));
};

const receiveNATList = (payload) => {
    throw new Error("receiveNATList: IT'S NOT IMPLEMENTED YET");
    return{
        type: FETCH_NAT_LIST,
        offers: payload,
    };
};*/
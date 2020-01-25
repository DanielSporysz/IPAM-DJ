export const createLocation = (location) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('locations').add({
            ...location,
            about: "Wuj wie gdzie",
            name: "Bzdziszewo"
        }).then(() => {
            dispatch({ type: 'CREATE_LOCATION', location });
        }).catch((err) => {
            dispatch({ type: 'CREATE__LOCATION_ERROR', err});
        })
    }
};
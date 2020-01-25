const initState = {
    locations: [
        {about: "Ta w Europie lol", name: "Polska"},
        {about: "Fajna gra", name: "Factorio"}
    ]
}

const locationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_LOCATION_SUCCESS':
            console.log('create location success');
            return state;
        case 'CREATE_LOCATION_ERROR':
            console.log('create locations error');
            return state;
        default:
            return state;
    }
};

export default locationReducer;
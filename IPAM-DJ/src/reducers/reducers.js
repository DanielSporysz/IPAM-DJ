import {TEST} from "../actions/types"

export const testReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                isTestSuccessful:true
            };
        default:
            return state;
    }
};
import {TEST} from "./types";

export const makeTest = () => dispatch => {
    dispatch({
        type: TEST,
    });
};
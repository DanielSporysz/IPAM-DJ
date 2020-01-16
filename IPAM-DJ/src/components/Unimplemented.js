import {Link} from "react-router-dom";
import React from "react";

function Unimplemented(props) {
    return (
        <div>
            <h1>This feature is not implemented yet ;.; (503)</h1>
            It's supposed to be <b>{props.feature}</b>
        </div>
    );
}

export default Unimplemented
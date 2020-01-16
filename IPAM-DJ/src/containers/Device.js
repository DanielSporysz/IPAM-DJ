import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function Device(props) {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={Device.name}/>
        </div>
    );
}

export default Device
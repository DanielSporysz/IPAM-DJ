import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function DeviceList() {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={DeviceList.name}/>
        </div>
    );
}

export default DeviceList
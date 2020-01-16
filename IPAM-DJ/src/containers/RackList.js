import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function RackList() {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={RackList.name}/>
        </div>
    );
}

export default RackList
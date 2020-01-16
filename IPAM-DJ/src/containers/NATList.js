import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function NATList() {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={NATList.name}/>
        </div>
    );
}

export default NATList
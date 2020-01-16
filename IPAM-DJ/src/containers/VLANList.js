import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function VLANList() {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={VLANList.name}/>
        </div>
    );
}

export default VLANList
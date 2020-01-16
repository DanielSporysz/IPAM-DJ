import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function VLAN(props) {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={VLAN.name}/>
        </div>
    );
}

export default VLAN
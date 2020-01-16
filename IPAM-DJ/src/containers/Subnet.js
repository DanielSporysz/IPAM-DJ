import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function Subnet(props) {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={Subnet.name}/>
        </div>
    );
}

export default Subnet
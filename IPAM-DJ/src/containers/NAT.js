import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function NAT(props) {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={NAT.name}/>
        </div>
    );
}

export default NAT
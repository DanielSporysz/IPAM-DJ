import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function Rack(props) {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={Rack.name}/>
        </div>
    );
}

export default Rack
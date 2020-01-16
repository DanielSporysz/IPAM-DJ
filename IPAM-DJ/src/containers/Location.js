import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function Location(props) {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={Location.name}/>
        </div>
    );
}

export default Location
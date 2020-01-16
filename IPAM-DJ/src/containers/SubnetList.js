import React from "react"
import Unimplemented from "../components/Unimplemented";
import TopNavBar from "../components/TopNavBar";

function SubnetList() {
    return (
        <div>
            <TopNavBar/>
            <Unimplemented feature={SubnetList.name}/>
        </div>
    );
}

export default SubnetList
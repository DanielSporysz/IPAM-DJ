import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Home";
import DeviceList from "./DeviceList";
import Location from "./LocationList";
import ViewLocation from "./LocationView";
import NATList from "./NATList";
import RackList from "./RackList";
import VLANList from "./VLANList";
import SubnetList from "./SubnetList";
import TestFirebase from "./TestFirebase";

function App() {
    return (<div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/device" component={DeviceList}/>
                    <Route exact path="/VLANList" component={VLANList}/>
                    <Route exact path="/NATList" component={NATList}/>
                    <Route exact path="/location" component={Location}/>
                    <Route path="/location/:id" component={ViewLocation}/>
                    <Route exact path="/rack" component={RackList}/>
                    <Route exact path="/subnet" component={SubnetList}/>
                    <Route exact path="/fb" component={TestFirebase}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App
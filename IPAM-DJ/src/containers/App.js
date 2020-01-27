import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Home";
import DeviceList from "./device/DeviceList";
import Location from "./location/LocationList";
import LocationAdd from "./location/LocationAdd";
import LocationEdit from "./location/LocationEdit";
import LocationDelete from "./location/LocationDelete";
import NATList from "./NAT/NATList";
import RackList from "./rack/RackList";
import VLANList from "./VLAN/VLANList";
import SubnetList from "./subnet/SubnetList";
import NameServerList from "./nameserver/NameServerList";
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
                    <Route exact path="/create/location" component={LocationAdd}/>
                    <Route path="/location/:id/edit" component={LocationEdit}/>
                    <Route path="/location/:id/delete" component={LocationDelete}/>

                    <Route exact path="/rack" component={RackList}/>

                    <Route exact path="/subnet" component={SubnetList}/>

                    <Route exact path="/name-server" component={NameServerList}/>

                    <Route exact path="/fb" component={TestFirebase}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App
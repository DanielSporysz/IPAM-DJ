import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Home";
import DeviceList from "./DeviceList";
import Location from "./LocationList";
import LocationEdit from "./LocationEdit";
import LocationDelete from "./LocationDelete";
import NATList from "./NATList";
import RackList from "./RackList";
import VLANList from "./VLANList";
import SubnetList from "./SubnetList";

function App() {
    return (<div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/device" component={DeviceList}/>
                    <Route exact path="/VLANList" component={VLANList}/>
                    <Route exact path="/NATList" component={NATList}/>
                    <Route exact path="/location" component={Location}/>
                    <Route path="/location/:id/edit" component={LocationEdit}/>
                    <Route path="/location/:id/delete" component={LocationDelete}/>
                    <Route exact path="/rack" component={RackList}/>
                    <Route exact path="/subnet" component={SubnetList}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App
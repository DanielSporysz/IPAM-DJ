import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Home";
import Device from "./Device";
import Location from "./Location";
import NAT from "./NAT";
import Rack from "./Rack";
import VLAN from "./VLAN";
import Subnet from "./Subnet";

function App() {
    return (<div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/device" component={Device} />
                    <Route path="/VLAN" component={VLAN} />
                    <Route path="/NAT" component={NAT} />
                    <Route path="/location" component={Location} />
                    <Route path="/rack" component={Rack} />
                    <Route path="/subnet" component={Subnet} />
                </Switch>
            </Router>
        </div>
    );
}

export default App
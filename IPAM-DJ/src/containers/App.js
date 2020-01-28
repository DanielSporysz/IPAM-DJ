import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Home";

import DeviceList from "./device/DeviceList";
import DeviceAdd from "./device/DeviceAdd";
import DeviceEdit from "./device/DeviceEdit";

import Location from "./location/LocationList";
import LocationAdd from "./location/LocationAdd";
import LocationEdit from "./location/LocationEdit";
import LocationDelete from "./location/LocationDelete";

import NATList from "./NAT/NATList";
import RackList from "./rack/RackList";
import VLANList from "./VLAN/VLANList";
import SubnetList from "./subnet/SubnetList";
import NameServerList from "./nameserver/NameServerList";

import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyB_fln91xB265ISN4xoOZ1U9ZngPZBOsSM",
    authDomain: "ipam-dj.firebaseapp.com",
    databaseURL: "https://ipam-dj.firebaseio.com",
    projectId: "ipam-dj",
    storageBucket: "ipam-dj.appspot.com",
    messagingSenderId: "960350779710",
    appId: "1:960350779710:web:52bb81b23470b9b16c146f",
    measurementId: "G-VWWR9EBQ2V"
};
firebase.initializeApp(config);

function App() {
    return (<div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route exact path="/device" component={DeviceList}/>
                    <Route exact path="/create/device" component={DeviceAdd}/>
                    <Route exact path="/device/:id/edit" component={DeviceEdit}/>

                    <Route exact path="/VLANList" component={VLANList}/>

                    <Route exact path="/NATList" component={NATList}/>

                    <Route exact path="/location" component={Location}/>
                    <Route exact path="/create/location" component={LocationAdd}/>
                    <Route path="/location/:id/edit" component={LocationEdit}/>
                    <Route path="/location/:id/delete" component={LocationDelete}/>

                    <Route exact path="/rack" component={RackList}/>

                    <Route exact path="/subnet" component={SubnetList}/>

                    <Route exact path="/name-server" component={NameServerList}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App
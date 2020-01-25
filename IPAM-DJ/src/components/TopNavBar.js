import React from "react";
import {Link} from "react-router-dom";

function TopNavBar() {
    return (
        <div className="topNavBar">
            <h1 className="title">IPAM-DJ</h1>
            <div className="links">
                <Link to={"/"} className="topNavBarLink">Home</Link>
                <Link to={"/device"} className="topNavBarLink">Device</Link>
                <Link to={"/VLANList"} className="topNavBarLink">VLAN</Link>
                <Link to={"/NATList"} className="topNavBarLink">NAT</Link>
                <Link to={"/location"} className="topNavBarLink">Location</Link>
                <Link to={"/rack"} className="topNavBarLink">Rack</Link>
                <Link to={"/subnet"} className="topNavBarLink">Subnet</Link>
                <Link to={"/name-server"} className="topNavBarLink">Nameserver</Link>
                <Link to={"/fb"} className="topNavBarLink">Fire</Link>
            </div>
            <hr/>
        </div>
    );
}

export default TopNavBar
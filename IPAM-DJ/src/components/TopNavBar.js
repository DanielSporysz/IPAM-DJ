import React from "react";
import {Link} from "react-router-dom";

function TopNavBar(props) {
    return (
        <div className="topNavBar">
            <h1 className="title">IPAM-DJ</h1>
            <div className="links">
                <Link to={"/"} className="topNavBarLink">Home</Link>
                <Link to={"/device"} className="topNavBarLink">Device</Link>
                <Link to={"/VLAN"} className="topNavBarLink">VLAN</Link>
                <Link to={"/NAT"} className="topNavBarLink">NAT</Link>
                <Link to={"/location"} className="topNavBarLink">Location</Link>
                <Link to={"/rack"} className="topNavBarLink">Rack</Link>
                <Link to={"/subnet"} className="topNavBarLink">Subnet</Link>
            </div>
            <hr/>
        </div>
    );
}

export default TopNavBar
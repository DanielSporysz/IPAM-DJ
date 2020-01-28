import React from "react";
import {Link} from "react-router-dom";

function TopNavBar(props) {

    function renderClassName(param) {
        switch(param) {
            case props.currentPage.path:
                return "topNavBarLink currentNavBarLink";
            default:
                return "topNavBarLink";
        }
    }

    return (
        <div className="topNavBar">
            <h1 className="title">IPAM-DJ</h1>
            <div>
                <ul className="links">
                    <Link to={"/"} className="topNavBarLink"><li>Home</li></Link>
                    <Link to={"/device"} className="topNavBarLink"><li>Device</li></Link>
                    <Link to={"/VLANList"} className="topNavBarLink"><li>VLAN</li></Link>
                    <Link to={"/NATList"} className="topNavBarLink"><li>NAT</li></Link>
                    <Link to={"/location"} className="topNavBarLink"><li>Location</li></Link>
                    <Link to={"/rack"} className="topNavBarLink"><li>Rack</li></Link>
                    <Link to={"/subnet"} className="topNavBarLink"><li>Subnet</li></Link>
                    <Link to={"/name-server"} className="topNavBarLink"><li>Nameserver</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default TopNavBar
import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../components/TopNavBar";
import {fetchDeviceListIfNeeded} from "../actions/fetchDeviceActions";
import Table from "../components/Table";

import EditImage from "../icons/edit.svg";
import DeleteImage from "../icons/delete.svg";

class DeviceList extends Component {
    static propTypes = {
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchDeviceListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.deviceList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/device/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/device/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar/>
                {this.props.isDeviceListReady ?
                    <div>
                        List of all devices:
                        <Table items={items} labels={["id", "about", "gateway",
                            "hostname", "loc", "ip", "mac", "nat", "options"]}/>
                    </div>
                    : "Fetching list of devices..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        deviceList: state.fetchReducer.deviceList,
        isDeviceListReady: state.fetchReducer.isDeviceListReady
    }
};

export default connect(mapStateToProps, {fetchDeviceListIfNeeded})(DeviceList)
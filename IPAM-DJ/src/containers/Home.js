import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../components/TopNavBar"
import {
    fetchVLANListIfNeeded,
    fetchSubnetListIfNeeded,
    fetchNameServerListIfNeeded,
    fetchRackListIfNeeded,
    fetchLocListIfNeeded,
    fetchDeviceListIfNeeded,
    fetchNATListIfNeeded
} from "../actions/fetchActions";
import PropTypes from "prop-types";

class Home extends Component {

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
        NATList: PropTypes.object,
        isNATListReady: PropTypes.bool,
        rackList: PropTypes.object,
        isRackListReady: PropTypes.bool,
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool,
        nameServerList: PropTypes.object,
        isNameServerListReady: PropTypes.bool,
        VLANList: PropTypes.object,
        isVLANListReady: PropTypes.bool,
        generateJSON: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            generateJSON: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLocListReady
            && this.props.isDeviceListReady
            && this.props.isNameServerListReady
            && this.props.isRackListReady
            && this.props.isNATListReady
            && this.props.isVLANListReady
            && this.props.isSubnetListReady
            && this.state.generateJSON) {
            let exportData = {
                deviceList: this.props.deviceList,
                VLANList: this.props.VLANList,
                NATList: this.props.NATList,
                locList: this.props.locList,
                rackList: this.props.rackList,
                subnetList: this.props.subnetList,
                nameServerList: this.props.nameServerList,
            };

            this.downloadFile(exportData)
                .then();
            this.setState({
                generateJSON: false
            })
        }
    }

    downloadFile = async (data) => {
        const fileName = "IPAM-DJ exported data";
        const json = JSON.stringify(data);
        const blob = new Blob([json], {type: 'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    requestJSON = () => {
        this.props.fetchVLANListIfNeeded();
        this.props.fetchSubnetListIfNeeded();
        this.props.fetchNameServerListIfNeeded();
        this.props.fetchRackListIfNeeded();
        this.props.fetchLocListIfNeeded();
        this.props.fetchDeviceListIfNeeded();
        this.props.fetchNATListIfNeeded();

        this.setState({
            generateJSON: true
        })
    };

    render() {
        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <h2 className="title">Welcome home! Make yourself feel comfortable!</h2>
                <div className="row"><button className="neutralBtn" onClick={e => this.requestJSON(e)}>Export database</button></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        deviceList: state.fetchReducer.deviceList,
        isDeviceListReady: state.fetchReducer.isDeviceListReady,

        VLANList: state.fetchReducer.VLANList,
        isVLANListReady: state.fetchReducer.isVLANListReady,

        NATList: state.fetchReducer.NATList,
        isNATListReady: state.fetchReducer.isNATListReady,

        locList: state.fetchReducer.locList,
        isLocListReady: state.fetchReducer.isLocListReady,

        rackList: state.fetchReducer.rackList,
        isRackListReady: state.fetchReducer.isRackListReady,

        subnetList: state.fetchReducer.subnetList,
        isSubnetListReady: state.fetchReducer.isSubnetListReady,

        nameServerList: state.fetchReducer.nameServerList,
        isNameServerListReady: state.fetchReducer.isNameServerListReady,
    }
};

export default connect(mapStateToProps, {
    fetchVLANListIfNeeded,
    fetchSubnetListIfNeeded,
    fetchNameServerListIfNeeded,
    fetchRackListIfNeeded,
    fetchLocListIfNeeded,
    fetchDeviceListIfNeeded,
    fetchNATListIfNeeded
})(Home)

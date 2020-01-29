import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchSubnetListIfNeeded, fetchDeviceListIfNeeded, fetchNATListIfNeeded} from "../../actions/fetchActions";
import {updateNAT} from "../../actions/updateActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Picker from "../../components/Picker";
import MultiPicker from "../../components/MultiPicker";

class NATAdd extends Component {

    static propTypes = {
        NATList: PropTypes.object,
        isNATListReady: PropTypes.bool,
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            devices: "",
            ip: "",
            subnet: "",
            formSent: false
        }
    }

    componentDidMount() {
        this.props.fetchSubnetListIfNeeded();
        this.props.fetchDeviceListIfNeeded();
        this.props.fetchNATListIfNeeded();

        this.importValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isNATListReady && this.props.isNATListReady) {
            this.importValues();
        }
    }

    importValues() {
        const id = this.props.match.params.id;
        if (this.props.isNATListReady && Object.keys(this.props.NATList).includes(id)) {
            this.setState({
                id: id,
                name: this.props.NATList[id]["name"],
                devices: this.props.NATList[id]["devices"],
                ip: this.props.NATList[id]["ip"],
                subnet: this.props.NATList[id]["subnet"]
            });
        }
    }

    handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        type === 'checkbox' ?
            this.setState({
                [name]: checked
            }) :
            this.setState({
                [name]: value
            });
    };

    sendForm = (event) => {
        event.preventDefault();

        const newItem = {
            name: this.state.name,
            devices: this.state.devices,
            ip: this.state.ip,
            subnet: this.state.subnet,
        };
        this.props.updateNAT(this.state.id,newItem);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div className="callbackDiv">
                        <h2>NAT has been updated.</h2>
                        <Link to={"/nat"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        if (!this.props.isSubnetListReady || !this.props.isDeviceListReady) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>Loading resources...</h2>
                </div>
            )
        }

        let subnetOptions = [""];
        for (const idx in this.props.subnetList) {
            subnetOptions.push(this.props.subnetList[idx]["id"]);
        }
        let devicesOptions = [""];
        for (const idx in this.props.deviceList) {
            devicesOptions.push(this.props.deviceList[idx]["id"]);
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Editing NAT <b>{this.state.id}</b></h2>
                    <form onSubmit={this.sendForm}>
                        Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                        IP:
                        <input
                            type="text"
                            name="ip"
                            placeholder="ip"
                            onChange={this.handleChange}
                            value={this.state.ip}
                        />
                        Devices:
                        <MultiPicker
                            options={devicesOptions}
                            onChange={this.handleChange}
                            value={this.state.devices}
                            name={"devices"}/>
                        Subnet:
                        <Picker
                            options={subnetOptions}
                            onChange={this.handleChange}
                            value={this.state.subnet}
                            name={"subnet"}/>
                        <div className="formFooter">
                            <Link to={"/VLAN"}>
                                <button className="returnButton neutralBtn">Cancel</button>
                            </Link>
                            <button className="submitButton goodBtn" type="submit" onClick={this.sendForm}>Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subnetList: state.fetchReducer.subnetList,
        isSubnetListReady: state.fetchReducer.isSubnetListReady,
        deviceList: state.fetchReducer.deviceList,
        isDeviceListReady: state.fetchReducer.isDeviceListReady,
        NATList: state.fetchReducer.NATList,
        isNATListReady: state.fetchReducer.isNATListReady,
    }
};

export default connect(mapStateToProps, {
    fetchSubnetListIfNeeded,
    fetchDeviceListIfNeeded,
    fetchNATListIfNeeded,
    updateNAT
})(NATAdd)
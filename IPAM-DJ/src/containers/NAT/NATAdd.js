import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchSubnetListIfNeeded, fetchDeviceListIfNeeded} from "../../actions/fetchActions";
import {createNAT} from "../../actions/createActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Picker from "../../components/Picker";
import MultiPicker from "../../components/MultiPicker";

class NATAdd extends Component {

    static propTypes = {
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
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
        this.props.createNAT(newItem);

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
                        <h2>New NAT has been created.</h2>
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
                    <h2>Create new NAT</h2>
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
                            <Link to={"/NAT"}>
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
    }
};

export default connect(mapStateToProps, {
    fetchSubnetListIfNeeded,
    fetchDeviceListIfNeeded,
    createNAT
})(NATAdd)
import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchLocListIfNeeded, fetchSubnetListIfNeeded, fetchNATListIfNeeded} from "../../actions/fetchActions";
import {createDevice} from "../../actions/createActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Picker from "../../components/Picker";

class DeviceAdd extends Component {

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
        NATList: PropTypes.object,
        isNATListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            about: "",
            gateway: false,
            hostname: "",
            owner: "",
            ip: "",
            mac: "",
            loc: "",
            nat: "",
            subnet: "",
            formSent: false
        }
    }

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
        this.props.fetchSubnetListIfNeeded();
        this.props.fetchNATListIfNeeded();
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

    createNewDevice = (event) => {
        event.preventDefault();

        const newDevice = {
            about: this.state.about,
            gateway: this.state.gateway,
            hostname: this.state.hostname,
            owner: this.state.owner,
            ip: this.state.ip,
            mac: this.state.mac,
            loc: this.state.loc,
            nat: this.state.nat,
            subnet: this.state.subnet,
        };
        this.props.createDevice(newDevice);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (!this.props.isLocListReady || !this.props.isSubnetListReady || !this.props.isNATListReady) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>Loading resources...</h2>
                </div>
            )
        }

        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div className="callbackDiv">
                        <h2>New device has been created.</h2>
                        <Link to={"/device"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        let subnetOptions = [""];
        for (const subnetIdx in this.props.subnetList) {
            subnetOptions.push(this.props.subnetList[subnetIdx]["id"]);
        }
        let locOptions = [""];
        for (const locIdx in this.props.locList) {
            locOptions.push(this.props.locList[locIdx]["id"]);
        }
        let NATOptions = [""];
        for (const NATIdx in this.props.NATList) {
            NATOptions.push(this.props.NATList[NATIdx]["id"]);
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Create a new device</h2>
                    <form onSubmit={this.createNewDevice}>
                        About:
                        <input
                            type="text"
                            name="about"
                            placeholder="about"
                            onChange={this.handleChange}
                            value={this.state.about}
                        />
                        Gateway:
                        <input
                            type="checkbox"
                            name="gateway"
                            onChange={this.handleChange}
                            checked={this.state.gateway}
                        />
                        Hostname:
                        <input
                            type="text"
                            name="hostname"
                            placeholder="hostname"
                            onChange={this.handleChange}
                            value={this.state.hostname}
                        />
                        IP:
                        <input
                            type="text"
                            name="ip"
                            placeholder="ip"
                            onChange={this.handleChange}
                            value={this.state.ip}
                        />
                        MAC:
                        <input
                            type="text"
                            name="mac"
                            placeholder="mac"
                            onChange={this.handleChange}
                            value={this.state.mac}
                        />
                        Owner:
                        <input
                            type="text"
                            name="owner"
                            placeholder="owner"
                            onChange={this.handleChange}
                            value={this.state.owner}
                        />
                        Location:
                        <Picker
                            options={locOptions}
                            onChange={this.handleChange}
                            value={this.state.loc}
                            name={"loc"}/>
                        NAT:
                        <Picker
                            options={NATOptions}
                            onChange={this.handleChange}
                            value={this.state.nat}
                            name={"nat"}/>
                        Subnet:
                        <Picker
                            options={subnetOptions}
                            onChange={this.handleChange}
                            value={this.state.subnet}
                            name={"subnet"}/>
                        <div className="formFooter">
                            <Link to={"/device"}>
                                <button className="returnButton neutralBtn">Cancel</button>
                            </Link>
                            <button className="submitButton goodBtn" type="submit" onClick={this.createNewDevice}>Create
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
        locList: state.fetchReducer.locList,
        isLocListReady: state.fetchReducer.isLocListReady,
        subnetList: state.fetchReducer.subnetList,
        isSubnetListReady: state.fetchReducer.isSubnetListReady,
        NATList: state.fetchReducer.NATList,
        isNATListReady: state.fetchReducer.isNATListReady
    }
};

export default connect(mapStateToProps, {
    fetchLocListIfNeeded,
    createDevice,
    fetchSubnetListIfNeeded,
    fetchNATListIfNeeded
})(DeviceAdd)
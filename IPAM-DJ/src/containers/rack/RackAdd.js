import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchDeviceListIfNeeded, fetchLocListIfNeeded} from "../../actions/fetchActions";
import {createRack} from "../../actions/createActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Picker from "../../components/Picker";
import MultiPicker from "../../components/MultiPicker";

class RackAdd extends Component {

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            about: "",
            devices: "",
            loc: "",
            size: "",
            formSent: false
        }
    }

    componentDidMount() {
        this.props.fetchDeviceListIfNeeded();
        this.props.fetchLocListIfNeeded();
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
            about: this.state.about,
            devices: this.state.devices,
            loc: this.state.loc,
            size: this.state.size,
        };
        this.props.createRack(newItem);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (!this.props.isDeviceListReady || !this.props.isLocListReady) {
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
                        <h2>New rack has been created.</h2>
                        <Link to={"/rack"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        let locOptions = [""];
        for (const subnetIdx in this.props.locList) {
            locOptions.push(this.props.locList[subnetIdx]["id"]);
        }
        let deviceOptions = [""];
        for (const subnetIdx in this.props.deviceList) {
            deviceOptions.push(this.props.deviceList[subnetIdx]["id"]);
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Create a new rack</h2>
                    <form onSubmit={this.sendForm}>
                        About:
                        <input
                            type="text"
                            name="about"
                            placeholder="about"
                            onChange={this.handleChange}
                            value={this.state.about}
                        />
                        Devices:
                        <MultiPicker
                            options={deviceOptions}
                            onChange={this.handleChange}
                            value={this.state.devices}
                            name={"devices"}/>
                        Location:
                        <Picker
                            options={locOptions}
                            onChange={this.handleChange}
                            value={this.state.loc}
                            name={"loc"}/>
                        Size:
                        <input
                            type="text"
                            name="size"
                            placeholder="size"
                            onChange={this.handleChange}
                            value={this.state.size}
                        />
                        <div className="formFooter">
                            <Link to={"/rack"}>
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
        locList: state.fetchReducer.locList,
        isLocListReady: state.fetchReducer.isLocListReady,
        deviceList: state.fetchReducer.deviceList,
        isDeviceListReady: state.fetchReducer.isDeviceListReady,
    }
};

export default connect(mapStateToProps, {
    fetchDeviceListIfNeeded,
    fetchLocListIfNeeded,
    createRack
})(RackAdd)
import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchDeviceListIfNeeded, fetchLocListIfNeeded, fetchRackListIfNeeded} from "../../actions/fetchActions";
import {updateRack} from "../../actions/updateActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Picker from "../../components/Picker";
import MultiPicker from "../../components/MultiPicker";

class RackEdit extends Component {

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
        rackList: PropTypes.object,
        isRackListReady: PropTypes.bool,
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            id:"",
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
        this.props.fetchRackListIfNeeded();

        this.importValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isRackListReady && this.props.isRackListReady) {
            this.importValues();
        }
    }

    importValues() {
        const id = this.props.match.params.id;
        if (this.props.isRackListReady && Object.keys(this.props.rackList).includes(id)) {
            this.setState({
                id: id,
                about: this.props.rackList[id]["about"],
                devices: this.props.rackList[id]["devices"],
                loc: this.props.rackList[id]["loc"],
                size: this.props.rackList[id]["size"]
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
            id: this.state.id,
            about: this.state.about,
            devices: this.state.devices,
            loc: this.state.loc,
            size: this.state.size,
        };
        this.props.updateRack(this.state.id, newItem);

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
                        <h2>Rack has been updated.</h2>
                        <Link to={"/rack"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        if (this.props.isRackListReady && !Object.keys(this.props.rackList).includes(this.state.id)) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>There is no rack of this id!</h2>
                </div>
            )
        }

        if (!this.props.isDeviceListReady || !this.props.isLocListReady || !this.props.isRackListReady) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>Loading resources...</h2>
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
                    <h2>Editing rack <b>{this.state.id}</b></h2>
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
                            <button className="submitButton goodBtn" type="submit" onClick={this.sendForm}>Submit
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
        rackList: state.fetchReducer.rackList,
        isRackListReady: state.fetchReducer.isRackListReady,
    }
};

export default connect(mapStateToProps, {
    fetchDeviceListIfNeeded,
    fetchLocListIfNeeded,
    fetchRackListIfNeeded,
    updateRack
})(RackEdit)
import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchLocListIfNeeded, fetchNameServerListIfNeeded, fetchSubnetListIfNeeded} from "../../actions/fetchActions";
import {updateSubnet} from "../../actions/updateActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Picker from "../../components/Picker";
import MultiPicker from "../../components/MultiPicker";

class SubnetEdit extends Component {

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
        nameServerList: PropTypes.object,
        isNameServerListReady: PropTypes.bool,
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            about: "",
            ip: "",
            ipmask: "",
            dhcp: "",
            nameservers: "",
            loc: "",
            dmz: false,
            routable: false,
            formSent: false
        }
    }

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
        this.props.fetchNameServerListIfNeeded();
        this.props.fetchSubnetListIfNeeded();

        this.importValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isSubnetListReady && this.props.isSubnetListReady) {
            this.importValues();
        }
    }

    importValues() {
        const id = this.props.match.params.id;
        if (this.props.isSubnetListReady && Object.keys(this.props.subnetList).includes(id)) {
            this.setState({
                id: id,
                about: this.props.subnetList[id]["about"],
                ip: this.props.subnetList[id]["ip"],
                mask: this.props.subnetList[id]["mask"],
                dhcp: this.props.subnetList[id]["dhcp"],
                nameservers: this.props.subnetList[id]["nameservers"],
                loc: this.props.subnetList[id]["loc"],
                dmz: this.props.subnetList[id]["dmz"],
                routable: this.props.subnetList[id]["routable"],
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
            about: this.state.about,
            ip: this.state.ip,
            mask: this.state.ipmask,
            dhcp: this.state.dhcp,
            nameservers: this.state.nameservers,
            loc: this.state.loc,
            dmz: this.state.dmz,
            routable: this.state.routable,
        };
        this.props.updateSubnet(this.state.id, newItem);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (!this.props.isNameServerListReady || !this.props.isLocListReady) {
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
                        <h2>Subnet has been updated.</h2>
                        <Link to={"/subnet"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        if (this.props.isSubnetListReady && !Object.keys(this.props.subnetList).includes(this.state.id)) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>There is no subnet of this id!</h2>
                </div>
            )
        }

        let locOptions = [""];
        for (const subnetIdx in this.props.locList) {
            locOptions.push(this.props.locList[subnetIdx]["id"]);
        }
        let nameServerOptions = [""];
        for (const subnetIdx in this.props.nameServerList) {
            nameServerOptions.push(this.props.nameServerList[subnetIdx]["id"]);
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Editing subnet <b>{this.state.id}</b></h2>
                    <form onSubmit={this.sendForm}>
                        About:
                        <input
                            type="text"
                            name="about"
                            placeholder="about"
                            onChange={this.handleChange}
                            value={this.state.about}
                        />
                        IP:
                        <input
                            type="text"
                            name="ip"
                            placeholder="ip"
                            onChange={this.handleChange}
                            value={this.state.ip}
                        />
                        Mask:
                        <input
                            type="text"
                            name="ipmask"
                            placeholder="mask"
                            onChange={this.handleChange}
                            value={this.state.ipmask}
                        />
                        DHCP:
                        <input
                            type="text"
                            name="dhcp"
                            placeholder="dhcp"
                            onChange={this.handleChange}
                            value={this.state.dhcp}
                        />
                        NameServers:
                        <MultiPicker
                            options={nameServerOptions}
                            onChange={this.handleChange}
                            value={this.state.nameservers}
                            name={"nameservers"}/>
                        Location:
                        <Picker
                            options={locOptions}
                            onChange={this.handleChange}
                            value={this.state.loc}
                            name={"loc"}/>
                        DMZ:
                        <input
                            type="checkbox"
                            name="dmz"
                            onChange={this.handleChange}
                            checked={this.state.dmz}
                        />
                        Routable:
                        <input
                            type="checkbox"
                            name="routable"
                            onChange={this.handleChange}
                            checked={this.state.routable}
                        />
                        <div className="formFooter">
                            <Link to={"/subnet"}>
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
        nameServerList: state.fetchReducer.nameServerList,
        isNameServerListReady: state.fetchReducer.isNameServerListReady,
        subnetList: state.fetchReducer.subnetList,
        isSubnetListReady: state.fetchReducer.isSubnetListReady,
    }
};

export default connect(mapStateToProps, {
    fetchLocListIfNeeded,
    fetchNameServerListIfNeeded,
    fetchSubnetListIfNeeded,
    updateSubnet
})(SubnetEdit)
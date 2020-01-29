import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {
    fetchVLANListIfNeeded,
    fetchSubnetListIfNeeded,
} from "../../actions/fetchActions";
import {updateVLAN} from "../../actions/updateActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import MultiPicker from "../../components/MultiPicker";

class VLANEdit extends Component {

    static propTypes = {
        VLANList: PropTypes.object,
        isVLANListReady: PropTypes.bool,
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            about: "",
            subnets: "",
            formSent: false
        }
    }

    componentDidMount() {
        this.props.fetchSubnetListIfNeeded();
        this.props.fetchVLANListIfNeeded();

        this.importValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isVLANListReady && this.props.isVLANListReady) {
            this.importValues();
        }
    }

    importValues() {
        const id = this.props.match.params.id;
        if (this.props.isVLANListReady && Object.keys(this.props.VLANList).includes(id)) {
            this.setState({
                id: id,
                name: this.props.VLANList[id]["name"],
                about: this.props.VLANList[id]["about"],
                subnets: this.props.VLANList[id]["subnets"]
            });
        }
    }

    sendForm = (event) => {
        event.preventDefault();

        const newItem = {
            id: this.state.id,
            name: this.state.name,
            about: this.state.about,
            subnets: this.state.subnets,
        };
        this.props.updateVLAN(this.state.id, newItem);

        this.setState({
            formSent: true
        });
    };

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

    render() {
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div className="callbackDiv">
                        <h2>VLAN has been updated.</h2>
                        <Link to={"/VLAN"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        if (!this.props.isVLANListReady || !this.props.isSubnetListReady) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>Loading resources...</h2>
                </div>
            )
        }

        if (this.props.isVLANListReady && !Object.keys(this.props.VLANList).includes(this.state.id)) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <h2>There is no VLAN of this id!</h2>
                </div>
            )
        }

        let subnetOptions = [""];
        for (const subnetIdx in this.props.subnetList) {
            if (this.props.subnetList.hasOwnProperty(subnetIdx)) {
                subnetOptions.push(this.props.subnetList[subnetIdx]["id"]);
            }
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Editing VLAN <b>{this.state.id}</b></h2>
                    <form onSubmit={this.sendForm}>
                        Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                        About:
                        <input
                            type="text"
                            name="about"
                            placeholder="about"
                            onChange={this.handleChange}
                            value={this.state.about}
                        />
                        Subnet:
                        <MultiPicker
                            options={subnetOptions}
                            onChange={this.handleChange}
                            value={this.state.subnets}
                            name={"subnets"}/>
                        <div className="formFooter">
                            <Link to={"/VLAN"}>
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
        VLANList: state.fetchReducer.VLANList,
        isVLANListReady: state.fetchReducer.isVLANListReady,
        subnetList: state.fetchReducer.subnetList,
        isSubnetListReady: state.fetchReducer.isSubnetListReady,
    }
};

export default connect(mapStateToProps, {
    fetchVLANListIfNeeded,
    fetchSubnetListIfNeeded,
    updateVLAN
})(VLANEdit)
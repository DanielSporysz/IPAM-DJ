import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchSubnetListIfNeeded} from "../../actions/fetchActions";
import {createVLAN} from "../../actions/createActions";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import MultiPicker from "../../components/MultiPicker";

class VLANAdd extends Component {

    static propTypes = {
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            about: "",
            name: "",
            subnets: "",
            formSent: false
        }
    }

    componentDidMount() {
        this.props.fetchSubnetListIfNeeded();
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

        const newDevice = {
            about: this.state.about,
            name: this.state.name,
            subnets: this.state.subnets,
        };
        this.props.createVLAN(newDevice);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (!this.props.isSubnetListReady) {
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
                        <h2>New VLAN has been created.</h2>
                        <Link to={"/vlan"}>
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

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Create a new device</h2>
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
                        Subnets:
                        <MultiPicker
                            options={subnetOptions}
                            onChange={this.handleChange}
                            value={this.state.subnets}
                            name={"subnets"}/>
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
    }
};

export default connect(mapStateToProps, {
    fetchSubnetListIfNeeded,
    createVLAN
})(VLANAdd)
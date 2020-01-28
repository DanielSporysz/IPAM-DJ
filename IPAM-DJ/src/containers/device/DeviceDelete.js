import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchDeviceListIfNeeded} from "../../actions/fetchActions";
import {deleteDevice} from "../../actions/deleteActions";

class DeviceDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        deviceList: PropTypes.object,
        isDeviceListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchDeviceListIfNeeded();
    }

    deleteItem = () => {
        this.props.deleteDevice(this.props.match.params.id);

        this.setState({
            formSent: true
        })
    };

    render() {
        const id = this.props.match.params.id;
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div className="callbackDiv">
                        <h2>Device {id} has been deleted.</h2>
                        <Link to={"/device"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isDeviceListReady ?
                    Object.keys(this.props.deviceList).includes(id) ?
                        <div className="delDiv">
                            <h2>Are you sure you want to <b>delete</b> device {id}?</h2>
                            <Link to={"/device"}>
                                <button className="neutralBtn">Cancel</button>
                            </Link>
                            <button className="badBtn" onClick={this.deleteItem}>Delete it</button>
                        </div> :
                        "There's no such device in the database."
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

export default connect(mapStateToProps, {fetchDeviceListIfNeeded, deleteDevice})(DeviceDelete)
import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchVLANListIfNeeded} from "../../actions/fetchActions";
import {deleteVLAN} from "../../actions/deleteActions";

class VLANDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        VLANList: PropTypes.object,
        isVLANListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchVLANListIfNeeded();
    }

    deleteItem = () => {
        this.props.deleteVLAN(this.props.match.params.id);

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
                        <h2>VLAN {id} has been deleted.</h2>
                        <Link to={"/VLAN"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isVLANListReady ?
                    Object.keys(this.props.VLANList).includes(id) ?
                        <div className="delDiv">
                            <h2>Are you sure you want to <b>delete</b> VLAN {id}?</h2>
                            <Link to={"/VLAN"}>
                                <button className="neutralBtn">Cancel</button>
                            </Link>
                            <button className="badBtn" onClick={this.deleteItem}>Delete it</button>
                        </div> :
                        "There's no such VLAN in the database."
                    : "Fetching list of VLANs..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        VLANList: state.fetchReducer.VLANList,
        isVLANListReady: state.fetchReducer.isVLANListReady
    }
};

export default connect(mapStateToProps, {fetchVLANListIfNeeded, deleteVLAN})(VLANDelete)
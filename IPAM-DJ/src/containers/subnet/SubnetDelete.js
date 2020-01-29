import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchSubnetListIfNeeded} from "../../actions/fetchActions";
import {deleteSubnet} from "../../actions/deleteActions";

class SubnetDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchSubnetListIfNeeded();
    }

    deleteItem = () => {
        this.props.deleteSubnet(this.props.match.params.id);

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
                        <h2>Subnet {id} has been deleted.</h2>
                        <Link to={"/subnet"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isSubnetListReady ?
                    Object.keys(this.props.subnetList).includes(id) ?
                        <div className="delDiv">
                            <h2>Are you sure you want to <b>delete</b> subnet {id}?</h2>
                            <Link to={"/subnet"}>
                                <button className="neutralBtn">Cancel</button>
                            </Link>
                            <button className="badBtn" onClick={this.deleteItem}>Delete it</button>
                        </div> :
                        "There's no such subnet in the database."
                    : "Fetching list of subnet..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subnetList: state.fetchReducer.subnetList,
        isSubnetListReady: state.fetchReducer.isSubnetListReady
    }
};

export default connect(mapStateToProps, {fetchSubnetListIfNeeded, deleteSubnet})(SubnetDelete)
import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchRackListIfNeeded} from "../../actions/fetchActions";
import {deleteRack} from "../../actions/deleteActions";

class RackDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        rackList: PropTypes.object,
        isRackListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchRackListIfNeeded();
    }

    deleteItem = () => {
        this.props.deleteRack(this.props.match.params.id);

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
                        <h2>Rack {id} has been deleted.</h2>
                        <Link to={"/rack"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isRackListReady ?
                    Object.keys(this.props.rackList).includes(id) ?
                        <div className="delDiv">
                            <h2>Are you sure you want to <b>delete</b> rack {id}?</h2>
                            <Link to={"/rack"}>
                                <button className="neutralBtn">Cancel</button>
                            </Link>
                            <button className="badBtn" onClick={this.deleteItem}>Delete it</button>
                        </div> :
                        "There's no such rack in the database."
                    : "Fetching list of racks..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rackList: state.fetchReducer.rackList,
        isRackListReady: state.fetchReducer.isRackListReady
    }
};

export default connect(mapStateToProps, {fetchRackListIfNeeded, deleteRack})(RackDelete)
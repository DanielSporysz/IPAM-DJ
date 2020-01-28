import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchNameServerListIfNeeded} from "../../actions/fetchActions";
import {deleteNameServer} from "../../actions/deleteActions";

class NameServerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        nameServerList: PropTypes.object,
        isNameServerListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchNameServerListIfNeeded();
    }

    deleteItem = () => {
        this.props.deleteNameServer(this.props.match.params.id);

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
                        <h2>Name-server {id} has been deleted.</h2>
                        <Link to={"/name-server"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isNameServerListReady ?
                    Object.keys(this.props.nameServerList).includes(id) ?
                        <div className="delDiv">
                            <h2>Are you sure you want to <b>delete</b> name-server {id}?</h2>
                            <Link to={"/name-server"}>
                                <button className="neutralBtn">Cancel</button>
                            </Link>
                            <button className="badBtn" onClick={this.deleteItem}>Delete it</button>
                        </div> :
                        "There's no such name-server in the database"
                    : "Fetching list of name-servers..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nameServerList: state.fetchReducer.nameServerList,
        isNameServerListReady: state.fetchReducer.isNameServerListReady
    }
};

export default connect(mapStateToProps, {fetchNameServerListIfNeeded, deleteNameServer})(NameServerDelete)
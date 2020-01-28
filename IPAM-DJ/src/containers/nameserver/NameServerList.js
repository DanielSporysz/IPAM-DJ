import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchNameServerListIfNeeded} from "../../actions/fetchActions";
import Table from "../../components/Table";

import EditImage from "../../icons/edit.svg";
import DeleteImage from "../../icons/delete.svg";

class NameServerList extends Component {
    static propTypes = {
        nameServerList: PropTypes.object,
        isNameServerListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchNameServerListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.nameServerList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/name-server/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/name-server/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isNameServerListReady ?
                    <div>
                        <div className="addDiv">
                            <h2>List of all nameservers:</h2>
                            <Link to={"/create/name-server"}>
                                <button className="neutralBtn">Add new nameserver</button>
                            </Link>
                        </div>
                        <Table items={items}
                               labels={["id",
                                   "nameserver",
                                   "options"]}/>
                    </div>
                    : "Fetching list of nameservers..."}
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

export default connect(mapStateToProps, {fetchNameServerListIfNeeded})(NameServerList)
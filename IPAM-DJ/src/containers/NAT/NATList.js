import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchNATListIfNeeded} from "../../actions/fetchActions";
import Table from "../../components/Table";

import EditImage from "../../icons/edit.svg";
import DeleteImage from "../../icons/delete.svg";

class NATList extends Component {
    static propTypes = {
        NATList: PropTypes.object,
        isNATListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchNATListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.NATList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/NAT/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/NAT/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isNATListReady ?
                    <div>
                        <div className="addDiv">
                            <h2>List of all NAT:</h2>
                            <Link to={"/create/NAT"}>
                                <button className="neutralBtn">Add new NAT</button>
                            </Link>
                        </div>
                        <Table
                            items={items}
                            labels={["id",
                                "name",
                                "devices",
                                "ip",
                                "subnet",
                                "options"]}/>
                    </div>
                    : "Fetching list of NATs..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        NATList: state.fetchReducer.NATList,
        isNATListReady: state.fetchReducer.isNATListReady
    }
};

export default connect(mapStateToProps, {fetchNATListIfNeeded})(NATList)
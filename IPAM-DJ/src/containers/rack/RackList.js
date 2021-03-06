import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchRackListIfNeeded} from "../../actions/fetchActions";
import Table from "../../components/Table";

import EditImage from "../../icons/edit.svg";
import DeleteImage from "../../icons/delete.svg";

class RackList extends Component {
    static propTypes = {
        rackList: PropTypes.object,
        isRackListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchRackListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.rackList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/rack/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/rack/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isRackListReady ?
                    <div>
                        <div className="addDiv">
                            <h2>List of all racks:</h2>
                            <Link to={"/create/rack"}>
                                <button className="neutralBtn">Add new rack</button>
                            </Link>
                        </div>
                        <Table items={items}
                            labels={["id",
                                "about",
                                "devices",
                                "loc",
                                "size",
                                "options"]}/>
                    </div>
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

export default connect(mapStateToProps, {fetchRackListIfNeeded})(RackList)
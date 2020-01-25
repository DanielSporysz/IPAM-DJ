import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../components/TopNavBar";
import {fetchRackListIfNeeded} from "../actions/fetchActions";
import Table from "../components/Table";

import EditImage from "../icons/edit.svg";
import DeleteImage from "../icons/delete.svg";

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
                <TopNavBar/>
                {this.props.isRackListReady ?
                    <div>
                        List of all racks:
                        <Table items={items} labels={["id", "about", "devices", "loc", "size"]}/>
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
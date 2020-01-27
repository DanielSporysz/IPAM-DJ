import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../components/TopNavBar";
import {fetchNATListIfNeeded} from "../actions/fetchActions";
import Table from "../components/Table";

import EditImage from "../icons/edit.svg";
import DeleteImage from "../icons/delete.svg";

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
                    <Link key={itemId + "edit"} to={"/nat/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/nat/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar/>
                {this.props.isNATListReady ?
                    <div>
                        List of all NAT:
                        <Table items={items} labels={["id", "device", "ip", "name", "subnet", "options"]}/>
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
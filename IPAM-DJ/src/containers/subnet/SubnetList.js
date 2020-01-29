import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchSubnetListIfNeeded} from "../../actions/fetchActions";
import Table from "../../components/Table";

import EditImage from "../../icons/edit.svg";
import DeleteImage from "../../icons/delete.svg";

class SubnetList extends Component {
    static propTypes = {
        subnetList: PropTypes.object,
        isSubnetListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchSubnetListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.subnetList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/subnet/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/subnet/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isSubnetListReady ?
                    <div>
                        <div className="addDiv">
                            <h2>List of all subnets:</h2>
                            <Link to={"/create/subnet"}>
                                <button className="neutralBtn">Add new subnet</button>
                            </Link>
                        </div>
                        <Table items={items}
                            labels={[
                                "id",
                                "about",
                                "ip",
                                "mask",
                                "dhcp",
                                "nameservers",
                                "loc",
                                "dmz",
                                "routable",
                                "options"]}/>
                    </div>
                    : "Fetching list of subnets..."}
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

export default connect(mapStateToProps, {fetchSubnetListIfNeeded})(SubnetList)
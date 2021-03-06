import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchVLANListIfNeeded} from "../../actions/fetchActions";
import Table from "../../components/Table";

import EditImage from "../../icons/edit.svg";
import DeleteImage from "../../icons/delete.svg";

class VLANList extends Component {
    static propTypes = {
        VLANList: PropTypes.object,
        isVLANListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchVLANListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.VLANList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/vlan/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/vlan/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isVLANListReady ?
                    <div>
                        <div className="addDiv">
                            <h2>List of all VLANs:</h2>
                            <Link to={"/create/VLAN"}>
                                <button className="neutralBtn">Add new VLAN</button>
                            </Link>
                        </div>
                        <Table items={items}
                        labels={["id", "name",
                            "about", "subnets",
                            "options"]}/>
                    </div>
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

export default connect(mapStateToProps, {fetchVLANListIfNeeded})(VLANList)
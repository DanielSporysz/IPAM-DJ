import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../components/TopNavBar";
import {fetchLocListIfNeeded} from "../actions/fetchActions";
import Table from "../components/Table";

import EditImage from "../icons/edit.svg";
import DeleteImage from "../icons/delete.svg";

class LocationList extends Component {
    static propTypes = {
        LocList: PropTypes.object,
        isLocListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
    }

    render() {
        // Add missing values to display
        let items = this.props.LocList;
        for (const itemId in items) {
            items[itemId]["id"] = itemId;
            items[itemId]["options"] =
                <div key={itemId + "options"}>
                    <Link key={itemId + "edit"} to={"/location/" + itemId + "/edit"}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link key={itemId + "delete"} to={"/location/" + itemId + "/delete"}>
                        <img className="delete" src={DeleteImage} alt="delete"/>
                    </Link>
                </div>;
        }

        return (
            <div>
                <TopNavBar/>
                {this.props.isLocListReady ?
                    <div>
                        List of all locations:
                        <Table items={items} labels={["id", "name", "about", "options"]}/>
                    </div>
                    : "Fetching list of locations..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        LocList: state.fetchReducer.LocList,
        isLocListReady: state.fetchReducer.isLocListReady
    }
};

export default connect(mapStateToProps, {fetchLocListIfNeeded})(LocationList)
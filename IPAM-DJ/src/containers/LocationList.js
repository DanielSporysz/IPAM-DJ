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
                <div>
                    <Link to={"/location/" + itemId + "/edit"} key={itemId}>
                        <img className="edit" src={EditImage} alt="edit"/>
                    </Link>
                    <Link to={"/location/" + itemId + "/delete"} key={itemId}>
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
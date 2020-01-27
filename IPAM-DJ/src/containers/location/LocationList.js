import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchLocListIfNeeded} from "../../actions/fetchActions";
import Table from "../../components/Table";

import EditImage from "../../icons/edit.svg";
import DeleteImage from "../../icons/delete.svg";

class LocationList extends Component {
    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
    }

    render() {
        // Add missing values
        let items = this.props.locList;
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
                <TopNavBar currentPage={this.props.match}/>
                <Link to={"/create/location"}>
                    <button>Add new location</button>
                </Link>
                {this.props.isLocListReady ?
                    <div>
                        <Table items={items}
                        labels={["id", "name",
                            "about", "options"]}
                        caption="List of all locations:"/>
                    </div>
                    : "Fetching list of locations..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        locList: state.fetchReducer.locList,
        isLocListReady: state.fetchReducer.isLocListReady
    }
};

export default connect(mapStateToProps, {fetchLocListIfNeeded})(LocationList)
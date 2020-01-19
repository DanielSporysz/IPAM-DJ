import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../components/TopNavBar";
import {fetchLocListIfNeeded} from "../actions/fetchActions";
import Table from "../components/Table";

class LocationList extends Component {
    static propTypes = {
        LocList: PropTypes.object,
        isLocListReady: PropTypes.bool,
    };

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
    }

    render() {
        let items = this.props.LocList;
        for(const itemId in items){
            items[itemId]["id"] = <Link to={"/location/" + itemId} key={itemId}>{itemId}</Link>
        }

        return (
            <div>
                <TopNavBar/>
                {this.props.isLocListReady ?
                    <div>
                        List of all locations:
                        <Table items={items} labels={["id", "name", "about"]}/>
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
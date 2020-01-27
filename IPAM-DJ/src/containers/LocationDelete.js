import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import TopNavBar from "../components/TopNavBar";
import {fetchLocListIfNeeded} from "../actions/fetchActions";

class LocationEdit extends Component {
    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
    }

    render() {
        const locationID = this.props.match.params.id;
        return (
            <div>
                <TopNavBar/>
                {this.props.isLocListReady ?
                    Object.keys(this.props.locList).includes(locationID) ?
                        <div>Ask for confirmation to <b>delete location</b> {locationID}</div> :
                        "There's no such location in the database"
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

export default connect(mapStateToProps, {fetchLocListIfNeeded})(LocationEdit)
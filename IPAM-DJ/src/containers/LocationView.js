import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import TopNavBar from "../components/TopNavBar";
import {__dev__fetchLocationList} from "../actions/fetchActions";

class LocationView extends Component {
    static propTypes = {
        LocList: PropTypes.object,
        isLocListReady: PropTypes.bool
    };

    componentDidMount() {
        if(!this.props.isLocListReady){
            this.props.__dev__fetchLocationList();
        }
    }

    render() {
        const locationID = this.props.match.params.id;
        return (
            <div>
                <TopNavBar/>
                {this.props.isLocListReady ?
                    Object.keys(this.props.LocList).includes(locationID) ?
                        "Location " + locationID + ". It's nice, isn't it?" :
                        "There's no such location in the database"
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

export default connect(mapStateToProps, {__dev__fetchLocationList})(LocationView)
import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchLocListIfNeeded} from "../../actions/fetchActions";
import {deleteLoc} from "../../actions/deleteActions";

class LocationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchLocListIfNeeded();
    }

    deleteLocation = () => {
        console.log("DELETEING");
        this.props.deleteLoc(this.props.match.params.id);

        this.setState({
            formSent: true
        })
    };

    render() {
        const locationID = this.props.match.params.id;
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    Location {locationID} has been deleted.
                    <Link to={"/location"}>
                        <button>Return</button>
                    </Link>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isLocListReady ?
                    Object.keys(this.props.locList).includes(locationID) ?
                        <div>
                            Are you sure you want to <b>delete</b> location {locationID}?
                            <button onClick={this.deleteLocation}>Delete it</button>
                            <Link to={"/location"}>
                                <button>Cancel</button>
                            </Link>
                            <Link to={"/location"}>
                                <button>Return</button>
                            </Link>
                        </div> :
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

export default connect(mapStateToProps, {fetchLocListIfNeeded, deleteLoc})(LocationEdit)
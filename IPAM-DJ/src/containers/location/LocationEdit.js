import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchLocListIfNeeded} from "../../actions/fetchActions";
import {updateLoc} from "../../actions/updateActions";
import {Link} from "react-router-dom";

class LocationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            about: "",
            formSent: false
        }
    }

    static propTypes = {
        locList: PropTypes.object,
        isLocListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchLocListIfNeeded();

        this.importValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isLocListReady && this.props.isLocListReady) {
            this.importValues();
        }
    }

    importValues = () => {
        const locationID = this.props.match.params.id;
        if (this.props.isLocListReady && Object.keys(this.props.locList).includes(locationID)) {
            this.setState({
                id: locationID,
                name: this.props.locList[locationID]["name"],
                about: this.props.locList[locationID]["about"]
            });
        }
    };

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    updateLocation = (event) => {
        event.preventDefault();

        const newLoc = {
            name: this.state.name,
            about: this.state.about
        };
        this.props.updateLoc(this.state.id, newLoc);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    Location <b>{this.state.id}</b> has been updated.
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
                    Object.keys(this.props.locList).includes(this.state.id) ?
                        <div class="formDiv">
                            <h2>Editing location <b>{this.state.id}</b>:</h2>
                            <form onSubmit={this.updateLocation}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    onChange={this.updateInput}
                                    value={this.state.name}
                                />
                                <input
                                    type="text"
                                    name="about"
                                    placeholder="about"
                                    onChange={this.updateInput}
                                    value={this.state.about}
                                />
                                <div class="formFooter">
                                    <Link to={"/location"}>
                                        <button class="returnButton neutralBtn">Cancel</button>
                                    </Link>
                                    <button class="submitButton goodBtn" type="submit" onClick={this.updateLocation}>Submit</button>
                                </div>
                            </form>
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

export default connect(mapStateToProps, {fetchLocListIfNeeded, updateLoc})(LocationEdit)
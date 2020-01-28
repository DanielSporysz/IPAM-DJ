import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchLocListIfNeeded} from "../../actions/fetchActions";
import {createLoc} from "../../actions/createActions";
import {Link} from "react-router-dom";

class LocationAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            about: "",
            formSent: false
        }
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    createNewLocation = (event) => {
        event.preventDefault();

        const newLoc = {
            name: this.state.name,
            about: this.state.about
        };
        this.props.createLoc(newLoc);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div class="callbackDiv">
                        <h2>New location has been created.</h2>
                        <Link to={"/location"}>
                            <button  class="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div class="formDiv">
                    <h2>Create a new location</h2>
                    <form onSubmit={this.createNewLocation}>
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
                            <button class="submitButton goodBtn" type="submit" onClick={this.updateLocation}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, {fetchLocListIfNeeded, createLoc})(LocationAdd)
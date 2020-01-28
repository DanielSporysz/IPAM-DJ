import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {createNameServer} from "../../actions/createActions";
import {Link} from "react-router-dom";

class NameServerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameserver: "",
            formSent: false
        }
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    createNewItem = (event) => {
        event.preventDefault();

        const newLoc = {
            nameserver: this.state.nameserver,
        };
        this.props.createNameServer(newLoc);

        this.setState({
            formSent: true
        });
    };

    render() {
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div className="callbackDiv">
                        <h2>New name-server has been created.</h2>
                        <Link to={"/name-server"}>
                            <button className="returnButton neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <div className="formDiv">
                    <h2>Create a new name-server</h2>
                    <form onSubmit={this.createNewItem}>
                        <input
                            type="text"
                            name="nameserver"
                            placeholder="nameserver"
                            onChange={this.updateInput}
                            value={this.state.nameserver}
                        />
                        <div className="formFooter">
                            <Link to={"/name-server"}>
                                <button className="returnButton neutralBtn">Cancel</button>
                            </Link>
                            <button className="submitButton goodBtn" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, {createNameServer})(NameServerAdd)
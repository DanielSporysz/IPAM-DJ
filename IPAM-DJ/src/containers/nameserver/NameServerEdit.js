import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import TopNavBar from "../../components/TopNavBar";
import {fetchNameServerListIfNeeded} from "../../actions/fetchActions";
import {updateNameServer} from "../../actions/updateActions";
import {Link} from "react-router-dom";

class NameServerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameserver: "",
            formSent: false
        }
    }

    static propTypes = {
        nameServerList: PropTypes.object,
        isNameServerListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchNameServerListIfNeeded();

        this.importValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isNameServerListReady && this.props.isNameServerListReady) {
            this.importValues();
        }
    }

    importValues = () => {
        const id = this.props.match.params.id;
        if (this.props.isNameServerListReady && Object.keys(this.props.nameServerList).includes(id)) {
            this.setState({
                id: id,
                nameserver: this.props.nameServerList[id]["nameserver"],
            });
        }
    };

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    updateNameServer = (event) => {
        event.preventDefault();

        const newItem = {
            nameserver: this.state.nameserver,
        };
        this.props.updateNameServer(this.state.id, newItem);

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
                        <h2>Name-server <b>{this.state.id}</b> has been updated.</h2>
                        <Link to={"/name-server"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isNameServerListReady ?
                    Object.keys(this.props.nameServerList).includes(this.state.id) ?
                        <div className="formDiv">
                            <h2>Editing name-server <b>{this.state.id}</b>:</h2>
                            <form onSubmit={this.updateNameServer}>
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
                                    <button className="submitButton goodBtn" type="submit"
                                            onClick={this.updateNameServer}>Submit
                                    </button>
                                </div>
                            </form>
                        </div> :
                        "There's no such name-server in the database"
                    : "Fetching list of name-servers..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nameServerList: state.fetchReducer.nameServerList,
        isNameServerListReady: state.fetchReducer.isNameServerListReady
    }
};

export default connect(mapStateToProps, {fetchNameServerListIfNeeded, updateNameServer})(NameServerEdit)
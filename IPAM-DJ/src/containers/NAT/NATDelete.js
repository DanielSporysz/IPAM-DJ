import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom";

import TopNavBar from "../../components/TopNavBar";
import {fetchNATListIfNeeded} from "../../actions/fetchActions";
import {deleteNAT} from "../../actions/deleteActions";

class NATDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false
        };
    }

    static propTypes = {
        NATList: PropTypes.object,
        isNATListReady: PropTypes.bool
    };

    componentDidMount() {
        this.props.fetchNATListIfNeeded();
    }

    deleteItem = () => {
        this.props.deleteNAT(this.props.match.params.id);

        this.setState({
            formSent: true
        })
    };

    render() {
        const id = this.props.match.params.id;
        if (this.state.formSent) {
            return (
                <div>
                    <TopNavBar currentPage={this.props.match}/>
                    <div className="callbackDiv">
                        <h2>NAT {id} has been deleted.</h2>
                        <Link to={"/NAT"}>
                            <button className="neutralBtn">Return</button>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                {this.props.isNATListReady ?
                    Object.keys(this.props.NATList).includes(id) ?
                        <div className="delDiv">
                            <h2>Are you sure you want to <b>delete</b> NAT {id}?</h2>
                            <Link to={"/NAT"}>
                                <button className="neutralBtn">Cancel</button>
                            </Link>
                            <button className="badBtn" onClick={this.deleteItem}>Delete it</button>
                        </div> :
                        "There's no such NAT in the database."
                    : "Fetching list of NATs..."}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        NATList: state.fetchReducer.NATList,
        isNATListReady: state.fetchReducer.isNATListReady
    }
};

export default connect(mapStateToProps, {fetchNATListIfNeeded, deleteNAT})(NATDelete)
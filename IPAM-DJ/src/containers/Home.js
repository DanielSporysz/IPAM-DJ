import React, {Component} from "react"
import {connect} from "react-redux"

import {makeTest} from "../actions/testActions";

import TopNavBar from "../components/TopNavBar"

class Home extends Component{
    render() {
        this.props.makeTest();
        return (
            <div>
                <TopNavBar/>
                Welcome home! Make yourself feel comfortable!
            </div>
        );
    }
}

export default connect(null, {makeTest})(Home)
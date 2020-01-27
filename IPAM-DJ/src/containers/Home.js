import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../components/TopNavBar"

class Home extends Component{
    render() {
        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <h2 class="title">Welcome home! Make yourself feel comfortable!</h2>
            </div>
        );
    }
}

export default connect()(Home)
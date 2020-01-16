import React, {Component} from "react"
import {connect} from "react-redux"

import TopNavBar from "../components/TopNavBar"

class Home extends Component{
    render() {
        return (
            <div>
                <TopNavBar/>
                Welcome home! Make yourself feel comfortable!
            </div>
        );
    }
}

export default connect()(Home)
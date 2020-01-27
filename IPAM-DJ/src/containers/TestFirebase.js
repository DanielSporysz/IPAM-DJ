import React, {Component} from "react"
import {connect} from "react-redux"
import firebase from 'firebase'

import TopNavBar from "../components/TopNavBar"
import firestore from "../components/Firestore"

class TestFirebase  extends React.Component {
    constructor() {
        super();
        this.state = {
            about: "",
            name: ""
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addLocations = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("locations").add({
            about: this.state.about,
            name: this.state.name
        });
        this.setState({
            about: "",
            name: ""
        });
    };

    showLocations = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const ref = db.collection('locations');

        let allLocations = ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        return (
            <div>
                <TopNavBar currentPage={this.props.match}/>
                <h1>Location test</h1>
                <form onSubmit={this.addLocation}>
                    <input
                        type="text"
                        name="about"
                        placeholder="about"
                        onChange={this.updateInput}
                        value={this.state.about}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={this.updateInput}
                        value={this.state.name}
                    />
                    <button type="submit" onClick={this.showLocations}>Wyślij</button>
                </form>

            </div>
        );
    }
}

export default connect()(TestFirebase)
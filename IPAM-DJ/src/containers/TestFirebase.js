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

    addUser = e => {
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

    /*componentWillMount() {
        var config = {
            apiKey: "AIzaSyB_fln91xB265ISN4xoOZ1U9ZngPZBOsSM",
            authDomain: "ipam-dj.firebaseapp.com",
            databaseURL: "https://ipam-dj.firebaseio.com",
            projectId: "ipam-dj",
            storageBucket: "ipam-dj.appspot.com",
            messagingSenderId: "960350779710",
            appId: "1:960350779710:web:52bb81b23470b9b16c146f",
            measurementId: "G-VWWR9EBQ2V"
        };

        firebase.initializeApp(config);

        firebase.database().ref('users/2').set(
            {
                name: 'TestingUser2',
                pass: 'TestingUser2pass'
            }
        ).then(() => {
            console.log('INSERTED !');
        }).catch((err) => {
            console.log(err);
        });

        firebase.database().ref('users').once('value', (data) => {
            console.log(data.toJSON());
        });

        firebase.firestore().collection('locations').add({
            about: "Tu psy nie szczekają dupami",
            name: "Bzdziszewo"
        });
    }*/

    render() {
        return (
            <div>
                <TopNavBar/>
                <form onSubmit={this.addUser}>
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
                    <button type="submit">Wyślij</button>
                </form>
            </div>
        );
    }
}

export default connect()(TestFirebase)
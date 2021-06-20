import React, { Component } from 'react';
import './App.css';
import * as MUI from 'material-ui';
import * as RR from 'react-router';

export default class Logout extends Component {

    componentDidMount() {
        console.log("Logout/componentDidMount")
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        //this.props.route.handleLogout()
        console.log("suppoosed to be pushing to another");
        //this.props.history.push("/Register");
        RR.browserHistory.push("/")
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}



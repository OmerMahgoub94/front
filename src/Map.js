import React, { Component } from 'react';
import './Trial.css';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            name: '',
            lastname: '',
            username: '',
            password: '',
            confirmpassword: '',
            email: '',
            phonenumber: '',
            billingaddress: ''

        };
    }



    render() {
        return (
            <div>
              live map here
            </div>
        );
    }
}


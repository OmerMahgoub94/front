import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './Trial.css';
import DB from './DB'
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs';
import * as RR from 'react-router'


const styles = {
    headline: {
        fontSize: 10,
        padding: 5
    },

    slide: {
        padding: 10,

    },
};



const db = new DB("/api/accounts")



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmpassword: '',
            email: '',
            phoneNumber: '',
            billingaddress: '',
            balance: '', 
            LoginErrMSg: ''


        };
    }

    componentWillMount(){
        var method = location.search.split('=')[1];
    }

    handleFirstName = (event) => {
        this.setState({ firstName: event.target.value })
    }

    handleLastName = (event) => {
        this.setState({ lastName: event.target.value })
    }

    handleUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleConfirmPassword = (event) => {
        this.setState({ confirmpassword: event.target.value })
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlePhonenumber = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }

    handleBillingAddress = (event) => {
        this.setState({ billingaddress: event.target.value })
    }





    handleBalance = (event) => {
        this.setState({ balance: event.target.value })
    }


    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };



    register = async (json, action) => {
        console.log("json", json)
        try {
            var response = await fetch('/api/Account/Register',

                {
                    method: 'post',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }

                }
                
            )
            if(response.ok){
                    RR.browserHistory.push('/');
                }
            console.log(json);
            console.log('register', response);
            //action()

        } catch (e) {
            console.log("Error", e)
        }
    }

    handleRegister = () => {
        if (this.state.password == this.state.confirmpassword) {
            this.register({
                "Email": this.state.email,
                "Password": this.state.password,
                "ConfirmPassword": this.state.confirmpassword

            }, RR.browserHistory.push("/Register"))
        } else {
            console.log("Password Mismatch!")
        }

    }



    handlePasswordLogin = (event) => {
        this.setState({ passwordLogin: event.target.value })
    }

    login = async (json, action) => {
        console.log(json);
        try {
            var response = await fetch('/Token',

                {
                    method: 'POST',
                    body: 'grant_type=password&username=' + json.username + '&password=' + json.password,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }

                }
            )

            var data = await response.json();
            console.log(data);
            // take an action with the data 
            action(data)

            if (response.ok) {
                console.log("you're logged in")
                this.setState({ loggedIn: true })
                sessionStorage.setItem('token', data.access_token)
                RR.browserHistory.push('/')
            }
        } catch (e) {
            console.log("Error", e)
        }
    }


    checkIfLogin = () => {

        this.findOne(
            this.state.username + "/",
            (data) => {
                console.log(data);
                if (data == null) {
                    console.log("Its a new User!")
                    this.setState({ account: undefined })
                    //this.props.history.push('/');
                    RR.browserHistory.push("/")

                    return false;
                } else {
                    console.log("Its a NOT a new User!")
                    //this.props.history.push('/');
                    console.log(data);
                    this.setState({ account: data })
                    // console.log(data.FirstName)
                    // sessionStorage.setItem("account", data);
                    // console.log(sessionStorage.getItem("account"));
                    RR.browserHistory.push("/")

                    return true;
                }
            }
        )
    }

    findOne = async (Id, action) => {
        console.log("The Username in FindOne", Id)
        try {
            var response = await fetch('/api/accounts/' + Id);
            if (response.status == 404) {
                action()
            } else {
                var data = await response.json();
                console.log("3");

                console.log(data);
                // take an action with the data 
                action(data)
            }


        } catch (e) {
            this.setState({LoginErrMSg: "Invalid username / password"})
            console.log("Error", e)
        }
    }


    handleLogin = () => {
        console.log("handle Login")

        console.log("Email: " + this.state.email + "\password: " + this.state.password)
        //console.log("Testing handleLogin")
        this.login(
            this.state,
            //console.log("LoginPrintout")
            (data) => {
                // set token somewhere global using data 
                sessionStorage.setItem('token', data.access_token);
                sessionStorage.setItem('userName', data.userName);
                // this.props.route.handleLogin()
                //this.props.route.handleUsername();
                this.checkIfLogin();

            }
        )
    }


    handleSaveProfile = () => {
        var index = this.state.email.indexOf("@");
        var usernamee = this.state.email.substring(0, index);
        console.log("username", usernamee);
        db.Create({
            "Username": usernamee,
            "FirstName": this.state.firstName,
            "LastName": this.state.lastName,
            "Email": this.state.email,
            "Phone": this.state.phoneNumber,
            "Type": "Consumer",
            "Date": new Date()
        });
        sessionStorage.setItem("username", usernamee);
        RR.browserHistory.push("/");
    }


    render() {
        return (
            <div>
                <Tabs
                    tabType={'scrollable'}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab className="logintab" label="LOGIN" value="a" style={styles.headline}>
                        <h3>{this.state.LoginErrMSg}</h3>
                        <div className="center">
                            <div className="form">
                                <br />
                                <h2>  <p id="head"> LOGIN </p></h2>
                                <div >
                                    Username: <MUI.TextField value={this.state.username} onChange={this.handleUsername} floatingLabelText="Username" />
                                    <br />
                                    Password: <MUI.TextField type="password" value={this.state.password} onChange={this.handlePassword} floatingLabelText="Password" />
                                    <br />
                                    <br />
                                    <br />
                                    <MUI.RaisedButton label="Log In" onClick={this.handleLogin} primary={true} />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </Tab>
{/* 
                    <Tab style={styles.headline} label="REGISTER" value="b">
                        <div className="center">
                            <div className="form"> */}
                            
                            {/* SEPEARATE SECTION */}

                                {/*<br />
                                <h2 >  <p id="head"> REGISTER </p></h2>
                                First Name: <MUI.TextField value={this.state.name} onChange={this.handleName} floatingLabelText="Enter your Name" />
                                <br />
                                Last Name: <MUI.TextField value={this.state.lastname} onChange={this.handleLastName} floatingLabelText="Enter your Last Name" />
                                <br />
                                Phone Number: <MUI.TextField value={this.state.phonenumber} onChange={this.handlePhonenumber} floatingLabelText="Enter your Phone number" />
                                <br />
                                Billing Address: <MUI.TextField value={this.state.billingaddress} onChange={this.handleBillingAddress} floatingLabelText="Enter your billing address" />
                                <br />
                                Balance Amount:  <MUI.TextField value={this.state.balance} onChange={this.handleBalance} floatingLabelText="Enter your balance" />
                                <br />
                                <MUI.RaisedButton label="Register!" onClick={this.handleRegister} primary={true} />
                                <br />
                                <br />*/}
                                {/* SEPARATE SECTION */}
                                
                                {/* <h2 style={styles.headline}>REGISTER</h2>
                                Email: <MUI.TextField value={this.state.email} onChange={this.handleEmail} floatingLabelText="Enter your username" />
                                <br />
                                Password: <MUI.TextField type="password" value={this.state.password} onChange={this.handlePassword} floatingLabelText="Enter your password" />
                                <br />
                                Confirm Password: <MUI.TextField type="password" value={this.state.confirmpassword} onChange={this.handleConfirmPassword} floatingLabelText="Enter your password again" />
                                <br />

                                <MUI.RaisedButton label="Register!" onClick={this.handleRegister} />
                            </div>
                        </div>
                    </Tab> */}

                    

                    {/* <Tab style={styles.headline} className="profileTab" label="Profile" value="b">
                        <div className="center">
                            <div className="form">
                                <br />
                                <h2>  <p id="head"> UPDATE PROFILE </p></h2>
                                First Name: <MUI.TextField value={this.state.firstName} onChange={this.handleFirstName} floatingLabelText="Enter your Name" />
                                <br />
                                Last Name: <MUI.TextField value={this.state.lastName} onChange={this.handleLastName} floatingLabelText="Enter your Last Name" />
                                <br />
                                Phone Number: <MUI.TextField value={this.state.phoneNumber} onChange={this.handlePhonenumber} floatingLabelText="Enter your Phone number" />
                                <br />
                                <MUI.RaisedButton label="Save" onClick={this.handleSaveProfile} primary={true} />
                                <br />
                                <br />
                            </div>
                        </div>
                    </Tab> */}


                </Tabs>
            </div>
        );
    }
}


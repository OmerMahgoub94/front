import React, { Component } from 'react';
import './App.css';
import * as MUI from 'material-ui';

export default class Login extends Component {

        state = {
               
                username: '',
                password:''
        }
       

        handleUsername = (event) => {
                this.setState({ username: event.target.value })
        }


       handlePassword = (event) => {
                this.setState({ password: event.target.value })
        }


        render() {

                return (
                        
                        <div >

                                <h1>Already have an Account </h1>

                               Username: <MUI.TextField  value={this.state.username} onChange={this.handleUsername} hintText="Username" floatingLabelText="Enter your username"/>
                               <br />
                               Password: <MUI.TextField  value={this.state.password} onChange={this.handlePassword} hintText="Password" floatingLabelText="Enter your password"/>
                               <br />
                                 <br />
                                   <br />
                              <MUI.RaisedButton label="login" onClick={this.handleLogin} />
 
                        </div>

                );

        }
}



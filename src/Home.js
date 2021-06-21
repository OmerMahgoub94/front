import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './App.css';
import { Link } from 'react-router'


export default class Home extends Component {

    render() {
        return (
            <div className="Homecontent">


                <div className="p1">
                    <h2 className="titleprop" >Executive Summary</h2>
                    <p>Energy sector of each country focusses on providing power and electricity to communities of people.
              Electricity has now become a necessity of the modern day. As the world is progressing every company and sectors are improving themselves to become technologically advanced.
              Technology has eased almost everything in our life and is much cheaper and faster than the tasks that we used to previously complete manually.
              A company like IPC should also consider the fact of advancing certain activities for its customers to save costs and at the same time keep customers satisfied. </p>
                    <br />
                </div>

                <div className="p2">
                    <h2 className="titleprop">About us</h2>
                    <p>General Electricity and Water Corporation "IPC" has been working to develop and upgrade the electricity sector,
                     the most vital sectors in the country. Therefore, its inception marked the advent of a new era of progress and prosperity for electricity sector.</p>
                </div>


                {sessionStorage.getItem("userName") !== "omer@test.com" ?
                <div className="p4">
                    
                    <p><h2 className="titleprop" >LOGIN TO YOUR ACCOUNT!</h2></p>
                    <MUI.RaisedButton containerElement={<Link to="/Login" />} label="LOGIN" />
                    <img alt="description" src={require('./images/piccc.jpg')} className="p4pic" />
                </div> 
                : null
               
    }


                <div className="p5">
                    <div className="p5Center">
                        <div className="p5box">
                            <img alt="something" src={require('./images/pic1.png')} className="pictureA" />
                            <h5>From beginning to end </h5>
                            <p>Anyone who's seen a power bill knows that comparing energy plans is complex.
                           We've made the process easy to understand.</p>

                        </div>
                        <div className="p5box">
                            <img alt="something" src={require('./images/pic2.png')} className="pictureA" />
                            <h5>Supported by our team </h5>
                            <p>The call center is open six days a week and is staffed by experts who
                            are ready to help you get connected.</p>
                        </div>
                        <div className="p5box">
                            <img alt="something" src={require('./images/pic3.png')} className="pictureA" />
                            <h5>A greate place to compare </h5>
                            <p>Save time while you look for a better deal. Easily compare plans from different energy companies in one place.</p>
                        </div>
                    </div>
                </div>



            </div>

        );

    }
}
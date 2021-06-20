import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login';
import Home from './Home';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Menu from './Menu';
import Map from './Map';
import Register from './Login';
import Service from './Service';
import Ticket from './Ticket';
import Bill from './Bill';
import MyProperties from './MyProperties';
import BillDetails from './BillDetails';
import PaymentBill from './PaymentBill';
import PayForm from './PayForm';
import Requests from './Requests';
import TicketsList from './TicketsList';
import TicketsDetails from './TicketsDetails';
import Logout from './Logout.js';
import SingleApproval from "./SingleApproval"

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  pinkA200,
  grey100,
  white, darkBlack

} from 'material-ui/styles/colors';


injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {

    primary1Color: "#336699", // taps
    primary2Color: "#E8EAF6",
    primary3Color: pinkA200,
    accent1Color: darkBlack, //underline tap
    accent2Color: grey100,
    accent3Color: pinkA200,
    textColor: darkBlack, //button
    alternateTextColor: white, // tab text color

    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // pickerHeaderColor: lightGreen500,
    // shadowColor: fullBlack,
  },
});

export default class App extends Component {
  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme} >
        <Router history={browserHistory}>
          <Route component={Menu} >
            <Route path="/" component={Home} />
            {/* <Route path="/Login" component={Login} /> */}
            <Route path="/Logout" component={Logout} />
            <Route path="/Login" component={Login} />
            <Route path="/Service" component={Service} />
            <Route path="/Ticket" component={Ticket} />
            <Route path="/Map" component={Map} />
            <Route path="/Bill" component={Bill} />
            <Route path="/BillDetails" component={BillDetails} />
            <Route path="/MyProperties" component={MyProperties} />
            <Route path="/PaymentBill" component={PaymentBill} />
            <Route path="/PayForm" component={PayForm} />
            <Route path="/Requests" component={Requests} />
            <Route path="/TicketsList" component={TicketsList} />
            <Route path="/TicketsDetails" component={TicketsDetails} />
            <Route path="/SingleApproval" component={SingleApproval} />

            
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}


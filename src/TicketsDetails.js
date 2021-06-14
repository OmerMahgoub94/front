import React, { Component } from 'react';
import './Trial.css';
import * as MUI from 'material-ui';
import { Link } from 'react-router'

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,

    },
    slide: {
        padding: 10,

    },
};

export default class TicketsDetails extends Component {


    render() {
        return (
            <div className="billing">

                <div className="ticketBox2">
                    <h2 className="h1font" className="titleprop"> *** Ticket Type **  </h2>
                    <p> *** Report or Question **  </p>
               
            

                        Reply: <MUI.TextField floatingLabelText="Enter your Title" />
                 <br/>
                    <div className="boxRight2">
                           <br/>
                              <br/>
                                <MUI.RaisedButton containerElement={<Link to="/TicketsList" />} primary={true} label="submit" />
                          <br/>
                             <br/>
                            </div> 
                        </div>
                    </div>
                    );
    }
}


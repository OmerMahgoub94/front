import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './Trial.css';
import DB from './DB';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },

    // customWidth: {
    //     width: 200,
    // },

    // slide: {
    //     padding: 10
    // },

    // block: {
    //     maxWidth: 250,
    // },
    // radioButton: {
    //     display: 'inline-block',
    //     width: '150px',
    //     marginLeft: '10px'
    // },

    // selectype: {
    //     margin: 0
    // }
};

const ticketDB = new DB("/api/tickets");
const propertiesDB = new DB("/api/consumer_owner_unit")


export default class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }

    state = {
        type: null,
        title: '',
        text: '',
        properties: [],
        ServiceId: null
    }

    componentWillMount() {
        propertiesDB.find((data) => this.setState({ properties: data }))
    }

    handleChange = (event, index, value) => {


        this.setState({ type: value })
    };

    handleTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    handleText = (event) => {
        this.setState({ text: event.target.value })
    }

    submitTicket = () => {
        console.log("prop", this.state.ServiceId)
        ticketDB.Create(this.state);
    }

    handlePropChange = (event, index, value) => {
        console.log("lets find the villa: " + value)
        propertiesDB.find((data) => this.setState({ServiceId: data.service.Id}), {"id": value})
    };

    render() {
        return (
            <div className="ticketform">
                <div className="form">
                    <h3 style={styles.headline}> <p id="head"> TICKET</p></h3>
                    <MUI.SelectField value={this.state.type} onChange={this.handleChange} floatingLabelText="Select Type of Ticket">
                        <MUI.MenuItem value={0} primaryText="Question" />
                        <MUI.MenuItem value={1} primaryText="Report an Issue" />
                    </MUI.SelectField>
                    <br />
                    Title: <MUI.TextField value={this.state.title} onChange={this.handleTitle} floatingLabelText="Enter your Title" />
                    <br />
                    Text:aw
                <MUI.TextField value={this.state.text} onChange={this.handleText} floatingLabelText="Enter Text" />
                   

                    {this.state.properties && this.state.type == 1 ?
                    <MUI.SelectField value={this.state.type} onChange={this.handlePropChange} floatingLabelText="Select Your Property">
                        {this.state.properties.map((data) =>
                            <MUI.MenuItem value={data.Id} primaryText={data.service.ResidenceType + ", " + data.service.ZoneNo}  />
                         )}

                    </MUI.SelectField>
                    : null}

                    <br />
                    <br />
                    <MUI.RaisedButton label="Submit Ticket" primary={true} onClick={this.submitTicket} />
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}


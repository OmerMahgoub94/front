import React, { Component } from 'react';
import './Property.css';
import * as MUI from 'material-ui';
import DB from './DB';
// import images from './images/Home.png';

const PaymentDB = new DB("/api/payments");
const billDB = new DB("/api/bills");

export default class PayForm extends Component {


    state = {
        cardnumber: '',
        expiryDate: '',
        securityCode: '',
        bill: null,
        amount: 0,
        isDeposit: false
    };


    componentDidMount() {
        var id = location.search.split('=')[1];
        if (id) {
            console.log("you sent " + id)
            billDB.findOne(id, (data) => this.setState({ bill: data }))
            this.setState({ isDeposit: false });

        } else {
            console.log("its a depost");
            this.setState({ isDeposit: true });

        }
        // var id = location.query.id;
        //  console.log("you sent id " + this.id)
        //
    }

    handleCardnumber = (event) => {
        this.setState({ cardnumber: event.target.value })
    }

    handleExpiryDate = (event) => {
        this.setState({ expiryDate: event.target.value })
    }

    handleSecurityCode = (event) => {
        this.setState({ securityCode: event.target.value })
    }
    handleDeposit = (event) => {
        this.setState({ amount: event.target.value })
    }

    handlePay = () => {


        var date = document.querySelector("#date");
        console.log(date.value);
        if (this.state.isDeposit) {
            PaymentDB.Create({
                "Description": "Deposit",
                "PaidDate": new Date(),
                "Status": "Complete",
                "AmountPaid": this.state.amount,
                "PaymentMethod": "Credit Card",
                "PaymentVendor": "N/A"
            })
        } else {
            PaymentDB.Create({
                "Description": "Bill Payment",
                "PaidDate": new Date(),
                "Status": "Complete",
                "AmountPaid": this.state.amount,
                "PaymentMethod": "Credit Card",
                "PaymentVendor": "N/A",
                "BillId": this.state.bill.Id
            })
        }
    }


    render() {
        return (
            <div>
                {console.log("IsDeposit?", this.state.isDeposit)}


                <div className="centerPaymenttable">
                    <img src={require('./images/Major-Credit.png')} alt="pic" className="creditpic" />
                    <p className="paytitle">
                        {this.state.isDeposit == false ? "PAY YOUR BILL NOW!" : "Deposit to your Account"}</p>
                    <table>
                        <tr>
                            <td>Card Number</td>
                            <td><MUI.TextField value={this.state.cardnumber} onChange={this.handleCardnumber} floatingLabelText="Card Number" /></td>
                        </tr>
                        <tr>
                            <td>Expiry Date</td>
                            <td><MUI.DatePicker hintText="Expiry Date" id="date" /> </td>
                        </tr>
                        <tr>
                            <td>Security Code</td>
                            <td><MUI.TextField value={this.state.securityCode} onChange={this.handleSecurityCode} floatingLabelText="Security Number" /></td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            {this.state.bill ? <td><MUI.TextField value={this.state.bill.Charge} onChange={this.handleDeposit} floatingLabelText="amount" disabled={true} /></td>
: <td><MUI.TextField value={this.state.amount} onChange={this.handleDeposit} floatingLabelText="amount" /></td>}
                        </tr>

                        <br />
                        <br />
                        <MUI.RaisedButton label="Proceed" onClick={this.handlePay} primary={true} className="proceedbtn" />
                        <br />
                        <br />
                    </table>
                    <br />
                </div>
            </div>
        );
    }
}


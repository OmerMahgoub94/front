import * as RR from 'react-router';


export default class DB {

    constructor(url) {
        this.url = url

    }

    ApproveRequest = async (json) => {
        // console.log(json);
        try {

            console.log(this.url)
            var response = await fetch("/ApproveRequest",

                {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            )
            var data = await response.json();
            console.log(data);

            // take an action with the data 
        } catch (e) {
            console.log("Error", e)
        }
    }

    GenerateBills = async () => {
        // console.log(json);
        try {

            console.log(this.url)
            var response = await fetch("/GenerateBills",

                {
                    method: 'GET',
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            )

            if (response.ok) {
                console.log("bills generated successfully.")
            }
            // var data = await response.json();
            // console.log(data);

            // take an action with the data 
        } catch (e) {
            console.log("Error", e)
        }
    }

    MonthlyConsumption = async () => {
        // console.log(json);
        try {

            console.log(this.url)
            var response = await fetch("/MonthlyConsumption?billId=" + 7,

                {
                    method: 'GET',
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            )

            if (response.ok) {
                console.log("bills generated successfully.")
            }
            var data = await response.json();
            console.log("consumption here");
            console.log(data);

            // take an action with the data 
        } catch (e) {
            console.log("Error", e)
        }
    }



    findAll = async (action) => {
        console.log("FINDALLL")
        console.log(this.url);
        try {

            var response = await fetch(this.url,

                {
                    method: 'GET',
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            );
            var data = await response.json();
            //                console.log(data[0].Name);
            console.log(data);
            action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }
    allServiceForUser = async (action) => {
        console.log("findAllServicesForUser with userID of ");
        // console.log(this.url);
        try {

            //var response = await fetch("/api/allRequestTypesOfStaff");
            var response = await fetch("/api/services/allServiceForUser",

                {
                    method: 'GET',
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            );
            var data = await response.json();

            console.log(data);
            action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }

    findAllRequestsForUser = async (action) => {
        console.log("AllRequestTypesOfStaff");
        //console.log(this.url);
        try {

            //var response = await fetch("/api/allRequestTypesOfStaff");
            var response = await fetch("/api/service/allRequestTypesOfStaff",

                {
                    method: 'get',
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            );
            var data = await response.json();

            console.log(data);
            action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }

    findOne = async (Id, action) => {
        console.log(Id)
        // console.log(action)
        try {
            console.log(this.url + "/" + Id);
            var response = await fetch(this.url + "/" + Id,
                {
                    method: 'get',
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }

            );
            var data = await response.json();
            console.log(data);
            // take an action with the data 
            console.log(action)
            action(data)
            console.log("done with data")
        } catch (e) {
            console.log("Error", e)
        }
    }


    Create = async (json) => {
        //console.log(json);
        try {

            console.log(this.url)
            console.log("json", json)
            var response = await fetch(this.url,

                {
                    method: 'post',
                    body: JSON.stringify(json),
                    headers: this.addToken({
                        'Content-type': 'application/json'
                    })

                }
            )
            var data = await response.json();
            console.log(data);
            if (data) {
                console.log("Added Successfully");
            }
            // take an action with the data 
        } catch (e) {
            console.log("Error", e)
        }
    }

    destroy = async (Id, action) => {
        console.log(action);
        try {
            await fetch(this.url + "/" + Id,
                {
                    method: 'DELETE'

                }


            );
            // var data = await response.json();
            // console.log(data);
            // take an action with the data 
            action()
        } catch (e) {
            console.log("Error", e)
        }
    }

    update = async (Id, json, action) => {
        console.log("ID" + Id)
        console.log(json);
        try {
            var response = await fetch(this.url + "/" + Id,

                {
                    method: 'PUT',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }

                }
            )
            //  var data = await response.json();
            // console.log(data);
            // take an action with the data 

            if (action) {
                action()
            }
        } catch (e) {
            console.log("Error", e)
        }
    }

    find = async (action, parameter) => {
        let urlParameters = ''
        console.log("Ahmedddd")
        console.log(parameter);

        if (parameter) {
            urlParameters = '?' + Object.keys(parameter).map(i => i + '=' + parameter[i]).join('&')
        }
        try {
            const Token = sessionStorage.getItem('token')
            var headers = {};
            if (Token) {
                headers.Authorization = 'Bearer ' + Token;
            }

            var response = await fetch(
                this.url + urlParameters,
                {
                    headers: headers
                }
            );
            var data = await response.json();
            console.log(data);

            action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }


    findByCategory = async (id, action) => {
        try {
            var response = await fetch('http://localhost:64054/api/Series?categoryID=' + id)
            var data = await response.json();
            console.log(data);
            action(data)

        } catch (e) {
            console.log("Erorr message", e);
        }

    }
    addToken = (headers) => {
        const TOKEN = sessionStorage.getItem('token')
        if (TOKEN) {
            headers.Authorization = 'Bearer ' + TOKEN;
        }

        console.log(headers)
        return headers
    }

    EmptyCart = async () => {
        try {
            // console.log("Iddddddd === " + id)

            await fetch(
                "http://localhost:64054/api/Buy/EmptyCart/",
                {
                    headers: this.addToken({})
                }
            );
            RR.browserHistory.push("/CartItem/all")


        } catch (e) {
            console.log("BOOOHH!! This is an Error", e)
        }
    }


    Buy = async (id) => {
        try {
            console.log("Iddddddd === " + id)

            await fetch(
                "http://localhost:64054/api/Buy/?id=" + id,
                {
                    headers: this.addToken({})
                }
            );
            RR.browserHistory.push("/CartItem/all")


        } catch (e) {
            console.log("BOOOHH!! This is an Error", e)
        }
    }



    CheckOut = async () => {

        try {

            await fetch(
                "http://localhost:64054/api/Buy/CheckOut/",
                {
                    headers: this.addToken({})
                }
            );
            RR.browserHistory.push("/Cart/all")
            // var data = await response.json();
            // console.log(data);

            // action(data)
        } catch (e) {
            console.log("BOOOHH!! This is an Error", e)
        }
    }



}

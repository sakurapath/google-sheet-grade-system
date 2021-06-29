//Declarations
const credentials = require("./credentials.json");
const { google } = require("googleapis")
const student = require("./control/C_assessStd")
const scopes = "https://www.googleapis.com/auth/spreadsheets"



//Establishing credentials for client
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    [scopes]
)

//Create client instance for auth
client.authorize((error, tokens) => {
    if (error) {
        console.log("Impossible to connect with the Google Sheet!")
        console.log("error: ", error)
        return
    } else {
        console.log("Connected with the Google Sheet!")
        //Execute controller file to assess students
        student.getSpreadsheet(client, google)
    }
})




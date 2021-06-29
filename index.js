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







// const Student = require('./model/M_Student')
// const google = require('googleapis')
// const { sheets } = require('googleapis/build/src/apis/sheets')

// const TOKEN_PATH = "credentials.json"
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets"

// async function createAuth() {

//     //Establish credentials for client
//     const auth = new google.Auth.GoogleAuth({
//         keyFile: TOKEN_PATH,
//         scopes: SCOPES
//     })

//     //Create client instance for auth
//     console.log("Getting client from Google Auth")
//     const client = await auth.getClient()
//     console.log("Finished getting client from Google Auth")

//     //Instance of Google Sheets
//     const googleSheets = sheets({ version: "v4", auth: client })

//     //Get metadata from spreadsheet
//     const spreadsheetId = "1Xys_eUY47pXOWJg9OWKgeAEkbQUYwaAzsqj3mYltt5w"

//     console.log("Retrieving meta data from the spreadsheet")
//     const metaData = await googleSheets.spreadsheets.get({
//         auth,
//         spreadsheetId,
//     });
//     console.log("Finished retrieving meta data from the spreadsheet")

//     //Reading the rows from the spreadsheet
//     console.log("Reading data from the spreadsheet")
//     const getRows = await googleSheets.spreadsheets.values.get({
//         auth,
//         spreadsheetId,
//         range: "engenharia_de_software"
//     })
//     console.log("Finished reading data from the spreadsheet")


//     //Printing data from the spreadsheet
//     console.log(getRows.data)
// }

// createAuth()

//Declarations
const spreadsheetId = "1Xys_eUY47pXOWJg9OWKgeAEkbQUYwaAzsqj3mYltt5w"
const Student = require('../model/M_Student')

async function getSpreadsheet(client, google) {
    //Instance of Google Sheets
    const gsApi = google.sheets({ version: 'v4', auth: client })

    //Establishing params for the spreadsheet reading
    const options = {
        spreadsheetId,
        range: "engenharia_de_software!A4:F27"
    }

    //Retrieving data from the spreadsheet (without the headers. Ex: Aluno, Faltas, etc...)
    console.log("Retrieving data from the spreadsheet...")
    let varData = await gsApi.spreadsheets.values.get(options)
    console.log("Data has been retrieved with success")

    // console.log(varData.data.values)

    //Loop for reading each student
    let stds = varData.data.values
    console.log("The teacher is verifying the students...")
    stds.map(std => {

        // console.log(std[2])
        let student = new Student(std)

        //Calculating results to push the correct output
        if (!student.calculatePresence(60)) {
            std.push("Reprovado por falta")
            std.push(student.final)
        } else {
            std.push(student.calculateGrade())
            std.push(student.final)
        }
    });
    console.log("The teacher has finished her assessment!")

    //Verifying the complete output
    // console.log(stds)


    //Establishing params for updating the data
    const updateOptions = {
        spreadsheetId,
        range: "engenharia_de_software!A4",
        valueInputOption: 'USER_ENTERED',
        resource: { values: stds }
    }

    let response = await gsApi.spreadsheets.values.update(updateOptions)

    //Retrieving the API response for debugging
    // console.log(response)

    console.log("The data has been outputed on the Google Sheet")
}


module.exports = { getSpreadsheet }
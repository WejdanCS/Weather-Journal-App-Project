// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port, listening);

function listening() {
    console.log(`server is running on port :${port}`);
}
// add data into server
app.post('/addData', addData);

function addData(req, res) {
    // console.log(req.body);
    const newEntry = {
            date: req.body.date,
            temp: req.body.temp,
            feelings: req.body.feelings,
        }
        // console.log(newEntry);
        // push new entry to project Data
    projectData.push(newEntry);
    res.send(projectData);

}
// get all data which stored on server
app.get('/allData', getData);

function getData(req, res) {
    res.send(projectData);
    // clear data after display on client side
    projectData.pop();
}
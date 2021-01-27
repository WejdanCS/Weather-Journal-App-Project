/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// setup Api url and API Key
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "6e9af1fa3a13e231fbd654916ec6e402&units=imperial";
// get error msg id to display error msg on UI when occured error.
var errorMsg = document.getElementById('errorMsg');

document.getElementById('generate').addEventListener('click', generateOutput);

function generateOutput() {
    // get user input (zip code & feelings)
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // get Temp from Weather Api
    getData(baseUrl, apiKey, zip).then(function(data) {
        // then post all data to server
        try {
            const { main } = data;
            postData('/addData', { date: newDate, temp: main.temp, feelings: feelings }).then(function(data) {
                // finally update UI 
                updateUI();
            });
        } catch (error) {
            errorMsg.innerHTML += `<br>error: ${data.message}`;
        }

    });
    // clear  all data 
    errorMsg.innerHTML = '';
    document.getElementById('date').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = '';

}
/**
 * 
 * @returns data from API 
 */
async function getData(baseUrl = '', apiKey = '', zipCode = '') {
    const response = await fetch(`${baseUrl}?zip=${zipCode},us&appid=${apiKey}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        errorMsg.innerHTML += `<br>error:${error}`;
    }
}

const postData = async(url = '', data = {}) => {
    // post data to server using Post method
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
    }, );

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        errorMsg.innerHTML += `<br>error${error}`;

    }
}

const updateUI = async() => {
    const response = await fetch('/allData');
    try {
        const allData = await response.json();
        document.getElementById('date').innerHTML = `Date:${allData.date}`;
        document.getElementById('temp').innerHTML = `temperature:${allData.temp} F`;
        document.getElementById('content').innerHTML = `Content: ${allData.feelings}`;

    } catch (error) {
        errorMsg.innerHTML += `<br>error${error}`;

    }
}
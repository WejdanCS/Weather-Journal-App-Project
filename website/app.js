/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// setup Api url and API Key
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "6e9af1fa3a13e231fbd654916ec6e402";
// console.log(newDate);

document.getElementById('generate').addEventListener('click', generateOutput);

function generateOutput() {
    // get user input (zip code & feelings)
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // get Temp from Weather Api
    getData(baseUrl, apiKey, zip).then(function(data) {
        // then post all data to server
        const { main } = data;
        // console.log(main.temp);
        postData('/addData', { date: newDate, temp: main.temp, feelings: feelings }).then(function(data) {
            // finally update UI 
            updateUI();
        });

    });
}
/**
 * 
 * @returns data from API 
 */
async function getData(baseUrl = '', apiKey = '', zipCode = '') {
    const response = await fetch(`${baseUrl}?zip=${zipCode},us&appid=${apiKey}`);
    try {
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(`error${error}`);
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
        // console.log(newData)
        return newData;
    } catch (error) {
        console.log(`error${error}`);
    }
}

const updateUI = async() => {
    const response = await fetch('/allData');
    try {
        const allData = await response.json();
        // console.log(allData[0]);
        document.getElementById('date').innerHTML = `Date:${allData[0].date}`;
        document.getElementById('temp').innerHTML = `temperature:${allData[0].temp} F`;
        document.getElementById('content').innerHTML = `Content: ${allData[0].feelings}`;


    } catch (error) {
        console.log(`error${error}`);
    }
}
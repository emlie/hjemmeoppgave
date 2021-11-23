// Get table
const dataTable = document.getElementById('dataTable');

// Store reelvant data for all functions
let apiData = [];

function fetchData() {
    // Fetch dat from API call and log in console
    fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2')
        .then(response => response.json())
        .then(data => {
            apiDataObject = data.Data.Data;
            // console.log(`apiDataObject data type is: ${typeof(apiDataObject)}`);
            // console.log(apiDataObject);

            // Store values in array
            Object.entries(apiDataObject).forEach(entry => {
                const value = entry[1];
                apiData.push(value);
            });

            // console.log(`apiData data type is: ${typeof(apiData)}`);
            // console.log(apiData);
            console.log(apiData[0]);
        });

}

function insertDataTableHeader() {
    console.log(`apiData data type is: ${typeof(apiData)}`);
    let keys = [];
    // Get object key names
    // const keys = Object.keys(apiData[0]);
    // console.log(keys)
    // Store values in array
    Object.entries(apiData[0]).forEach(entry => {
        const key = entry[0];
        keys.push(key);
    });
}

function insertDataRows() {
    //
    apiData.forEach(obj => {
        Object.entries(obj).forEach(entry => {
            const value = entry[1];
            dataTable.innerHTML += `
    <tr>
        <td>${element[0]}</td>
     </tr>
    `;
        });
    });

}

// Run all functions
fetchData()
    // insertDataTableHeader()
insertDataRows()
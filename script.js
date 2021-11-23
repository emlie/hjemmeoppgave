// Get table
const dataTable = document.getElementById('dataTable');
const dataTableHeader = document.getElementById('dataTableHeader');

function fetchData() {
    // Store reelvant data for all functions
    let apiData = [];

    // Fetch dat from API call
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
            // console.log(`apiData[0] is: ${apiData[0]}`);
            // console.log(apiData[0]);

            // Get object keys
            const keys = Object.keys(apiData[0]);
            console.log(keys)

            // Insert object keys as table header cells
            keys.forEach(key => {
                dataTableHeader.innerHTML += `<th>${key}</th>`;
            });

            // Test by inserting data from day 1
            /*
            Object.entries(apiData[0]).forEach(entry => {
                const value = entry[1];
                dataTable.innerHTML += `
            <tr>
                <td>${value}</td>
             </tr>
            `;
            });
            */

            // console.log(apiData[0]);
            // Insert as many table rows as there are days of data
            for (let i = 0; i <= (apiData.length - 1); i++) {
                // Add a table row and set an unique id
                dataTable.innerHTML += `<tr id="tr-${i}"></tr>`;
                console.log('successfully added rows');

                // Find corresponding data
                Object.entries(apiData[i]).forEach(entry => {
                    const row = document.getElementById(`tr-${i}`);
                    const value = entry[1];

                    // Insert table data into row
                    row.innerHTML += `<td>${value}</td>`;
                });
            }

            // Insert corresponding data
            /*
            apiData.forEach(obj => {
                Object.entries(obj).forEach(entry => {
                    const value = entry[1];
                    dataTable.innerHTML += `
            <tr>
                <td>${value}</td>
             </tr>
            `;
                });
            });
            */
        });
}

function insertDataTableHeader() {
    console.log(`apiData[0] is: ${apiData[0]}`);
    let keys = [];
    // Get object key names
    // const keys = Object.keys(apiData[0]);
    // console.log(keys)
    // Store values in array
    /*
    Object.entries(apiData[0]).forEach(entry => {
        const key = entry[0];
        keys.push(key);
    });
    */
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
    // insertDataRows()
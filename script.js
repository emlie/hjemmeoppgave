/* PERSONAL NOTES
 * ---------------
 * The idea:
 * 1 function for fetching API data and making it globally available: fetchData(page)
 * 1 function for inserting the pagination buttons: insertPagination()
 * 1 function for inserting the table header: insertTableHeader()
 * 1 function for inserting the data rows according to what page we are on: insertData(page)
 * 
 * 
 * ISSUES FOUND WHILST CODING
 * --------------------------
 * 1) Realized too late that in order to access the API data outside fetch(),
 * one needs to return a promise, and then you can call the data again. This is the main issue.
 * 2) Due to this, the current code is not as modular as originally planned for and described above.
 * Now, since everything is withing a single function, everyting is called repeatedly.
 * This results in the table not being properly reset and ready to contain the next page's data rows,
 * as well as the pagination buttons being added again and again. These issues are very easily
 * fixed once issue 1) is solved.
 */

// Get elements
const paginationButtons = document.getElementById('paginationButtons');
const dataTable = document.getElementById('dataTable');
const dataTableHeader = document.getElementById('dataTableHeader');

let thisPage; // should be renamed to currentPage; and this code's currentPage (in argument below) should be page

function fetchData(currentPage) {
    // Store reelvant data
    let apiData = [];

    // Fetch dat from API call
    fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2')
        .then(response => response.json())
        .then(data => {
            apiDataObject = data.Data.Data;

            // Store values in array
            Object.entries(apiDataObject).forEach(entry => {
                const value = entry[1];
                apiData.push(value);
            });

            // console.log(`apiData data type is: ${typeof(apiData)}`);
            // console.log(`apiData[0] is: ${apiData[0]}`);
            // console.log(apiData[0]);

            // Get a single object's keys
            const keys = Object.keys(apiData[0]);
            console.log(keys)

            // Insert object keys as table header cells
            keys.forEach(key => {
                dataTableHeader.innerHTML += `<th>${key}</th>`;
            });

            // Find the right index boundaries for the pagination
            const totalDays = apiData.length - 1;
            const displayDays = 20;
            const pages = totalDays / displayDays; // => 5
            const maxIndex = displayDays * currentPage - 1;
            let minIndex;

            if (currentPage == 1) {
                minIndex = 0;
            } else {
                minIndex = maxIndex - 20;
            }

            // Insert pagination buttons
            for (let i = 1; i <= pages; i++) {
                paginationButtons.innerHTML += `<a class="pageBtn" onclick="fetchData(${i})">${i}</a>`;
            }
            // console.log(`totalDays: ${totalDays}`);
            // console.log(`pages: ${pages}`);
            // console.log('success: add pagination');

            // Insert as many table rows as there are days of data
            // Page 1: minIndex = 0; maxIndex = 19;
            // Page 2: minIndex = 19; maxIndex = 39;
            // Page 3: minIndex = 39; maxIndex = 59;
            // Page 4: minINdex = 59; maxIndex = 79;
            // Page 5: minIndex = 9; maxIndex = 99;
            for (let i = minIndex; i <= maxIndex; i++) {
                // Reset table to only include table header
                // dataTable.innerHTML = ``; // conflict now because everything is made withing the same function

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
        });
}

// Insert pagination buttons
/*
function insertPagination() {
    for (let i = 1; i <= pages; i++) {
        paginationButtons.innerHTML += `<a class="pageBtn" onclick="fetchData(${i})">${i}</a>`;
    }
    console.log(`totalDays: ${totalDays}`);
    console.log(`pages: ${pages}`);
    console.log('success: add pagination');
}
*/

/*
function insertDataTableHeader() {
    console.log(`apiData[0] is: ${apiData[0]}`);
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
*/

function newPage() {
    // Go to the next page, whether that's forward (next) or backwards (previous)
    // Keep a global counter of what the current page is: thisPage
    switch (this.dataset.direction) {
        case 'previous':
            thisPage--;
            fetchData(thisPage);
            break;
        case 'next':
            thisPage++;
            fetchData(thisPage);
            break;
        default:
            //
    }
}

// Run all functions
// insertPagination();
fetchData(1)
    // insertDataTableHeader()
    // insertDataRows()
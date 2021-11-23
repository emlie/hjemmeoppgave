# Hjemmeoppgave
Hent data fra API-kall, vis dataen i en tabell og skap din egen paginerings-løsning for å kun se data fra 20 dager om gangen, og å kunne bla mellom den totale dataen.
___
See the project on [Github Pages](https://emlie.github.io/hjemmeoppgave/)
___
## THE IDEA
 * 1 function for fetching API data and making it globally available: fetchData(page)
 * 1 function for inserting the pagination buttons: insertPagination()
 * 1 function for inserting the table header: insertTableHeader()
 * 1 function for inserting the data rows according to what page we are on: insertData(page)

 ## ISSUES FOUND WHILST CODING
1) Realized too late that in order to access the API data outside fetch(), one needs to return a promise, and then you can call the data again. This is the main issue.
2) Due to this, the current code is not as modular as originally planned for and described above. Now, since everything is withing a single function, everyting is called repeatedly. This results in the table not being properly reset and ready to contain the next page's data rows, as well as the pagination buttons being added again and again. These issues are very easily fixed once issue 1) is solved.

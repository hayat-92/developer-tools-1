const axios = require('axios');
const objectsToCsv = require('objects-to-csv');
const fs = require('fs');

function getApiURL() {
// Returns a String denoting the API url which fetches all problems
}

async function getAllProblems() {
// Returns a Promise object of the response on calling
// the API to fetch all problems
}


function getTopHundredProblems(allProblems) {
    // Returns the top 100 most submitted problems
	// Input:
	//  	allProblems - Raw API response
	// Output:
	//  	Array of objects with the question id, title and total submissions values for the
	//      top 100 problems ordered by their total submissions in descending order

}


async function createCSV(topHundredProblems) {
    // Write data to a CSV file
	// Input:
	//  	topHundredProblems - data to write


}

async function main() {
    console.log("Running main");
    const allProblems = await getAllProblems();
    if (allProblems != null) {
		fs.writeFile("./problemsAll.json", JSON.stringify(allProblems, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
	   });
	}

    const topHundredProblems = await getTopHundredProblems(allProblems);
    createCSV(topHundredProblems);
}

module.exports = {getApiURL, getAllProblems, getTopHundredProblems, createCSV, main};

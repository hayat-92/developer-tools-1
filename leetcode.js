const axios = require('axios');
const objectsToCsv = require('objects-to-csv');
const fs = require('fs');

function getApiURL() {
// Returns a String denoting the API url which fetches all problems
return 'https://leetcode.com/api/problems/all/';
}

async function getAllProblems() {
	let leetUrl=getApiURL();
	try {
		var response=await axios.get(leetUrl);
	} catch (error) {
		return error;
	}
	return response.data;
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
	// console.log(allProblems);
	let filtered_problems=allProblems.stat_status_pairs.filter(question => {
		return question.paid_only === false;
	} );

	// console.log(`Faisal=> ${filtered_problem}`);

	let reduced_array=[];
	filtered_problems.forEach(element => {
		let reduced_object=	{id:element.stat.frontend_question_id, question_title: element.stat.question__title, submissions: element.stat.total_submitted};
		reduced_array.push(reduced_object);
	});

	reduced_array.sort((elem1, elem2) => {
		return elem2.submissions - elem1.submissions;
	});

	// console.log(`Faisal Hassan=> ${reduced_array}`);

	let final_reduced_array=reduced_array.slice(0,100);

	return final_reduced_array;


}


async function createCSV(topHundredProblems) {
    // Write data to a CSV file
	// Input:
	//  	topHundredProblems - data to write

	const csv = new objectsToCsv(topHundredProblems);
 
    // Save to file:
    await csv.toDisk('./list.csv');


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

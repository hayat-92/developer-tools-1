const functions = require('../leetcode');
const axios = require('axios');
const objectsToCsv = require('objects-to-csv');
const fs = require('fs');

jest.mock('axios');


describe('Tests for getting top 100 problems', () => {
    it('', async () => {
        var problemData = require('../data.json');
        var topHundredProblemsMocked = getTopHundredProblemsMocked(problemData);
        var topHundredProblemsReal = functions.getTopHundredProblems(problemData);
        expect(topHundredProblemsMocked).toEqual(topHundredProblemsReal);
    });
});


function filterPaidProblems(data) {
    let dataToFilter = data.stat_status_pairs;
    let filteredData = dataToFilter.filter(problem => !(problem.paid_only))
    return filteredData;
}

function compare(first, second) {
    return second.submissions - first.submissions;
}

function sortBySubmission(data) {
    return data.sort(compare);
}

function getTopNProblems(N, data) {
    return data.slice(0,N);
}

function reducer(accumulator, object) {
    accumulator.push({
        id: object.stat.frontend_question_id,
        question_title: object.stat.question__title,
        submissions: object.stat.total_submitted
    });
    return accumulator;
}

function transformData(data) {
    let transformedData = data.reduce(reducer,[]);
    return transformedData;
}

function getTopHundredProblemsMocked(allProblems) {
    let unpaidProblems = filterPaidProblems(allProblems);
    let transformedProblems = transformData(unpaidProblems);
    let problemsSortedBySubmission = sortBySubmission(transformedProblems);
    let topHundredProblems = getTopNProblems(100, problemsSortedBySubmission);
    return topHundredProblems;
}

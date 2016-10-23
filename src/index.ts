import * as request from 'request';
import { Search } from './models';
import API from './api';
import IO from './io';
const json2csv: Function = require('json2csv');

function logResults(responses: Search.IResponse[]): void {
	const csv = json2csv({ 
		data: responses,
		fields: [ 'query', 'totalResults' ]
	});
	console.log(csv);
} 

async function getResults(): Promise<Search.IResponse[]> {
	return await IO.GetQueries().then(API.makeRequestsWithQueries);
}

async function main() {
	console.log('Starting search...');
	const results = await getResults();
	logResults(results);
	// results.map(r => console.log(r.query, getCompanies(r)));
	const deserializedResults = results.map(r => new Search.Response(r));
	deserializedResults.forEach(d => console.log(d.companies));
}

main();
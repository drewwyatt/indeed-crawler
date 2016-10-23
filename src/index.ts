import * as request from 'request';
import { Search } from './models';
import API from './api';
import IO from './io';

async function getResults(): Promise<Search.IResponse[]> {
	return await IO.GetQueries().then(API.makeRequestsWithQueries);
}

async function main() {
	console.log('Starting search...');
	const results = await getResults();
	console.log('Writing results to file...');
	IO.WriteToCSV(results.map(r => new Search.Response(r)), ['query', 'totalResults', 'scannedResults', 'numberOfCompanies', 'companies']);
	console.log('Done!');
}

main();
import * as request from 'request';
import { Search } from './models';
import API from './api';
import IO from './io';
import { Utils } from './utils';

async function getResults(): Promise<Search.IResponse[]> {
	return await IO.GetQueries().then(API.makeRequestsWithQueries);
}

function checkEnvironmentVars(): void {
	if (!process.env.PUBLISHER_ID || !Utils.isNumeric(process.env.PUBLISHER_ID)) {
		throw new Error('Missing or non-numeric environment variable PUBLISHER_ID. Please make sure you copy .env.example to a new .env file and add your publisher id from ads.indeed.com/jobroll/xmlfeed!');
	}

	if(!process.env.PAGING_CAP || !Utils.isNumeric(process.env.PAGING_CAP)) {
		throw new Error('Missing or non-numeric environment variable PAGING_CAP. Please make sure you copy .env.example to a new .env file and specify the number of pages this process should crawl for each query.');
	}
}

async function main() {
	checkEnvironmentVars();
	console.log('Starting search...');
	const results = await getResults().catch(stopExecution);
	if (results) {
		console.log('Writing results to file...');
		IO.WriteToCSV(results.map(r => new Search.Response(r)), ['query', 'totalResults', 'scannedResults', 'numberOfCompanies', 'companies']);
		console.log('Done!');
	}
}

function stopExecution(err: Error) {
	console.log('Stopping searches because of an error.');
	console.error(err);
	process.exit();
}


main();
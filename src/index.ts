import * as fs from 'fs';
import * as request from 'request';
import { Search } from './models';

// const API_BASE = 'http://api.indeed.com/ads/apisearch?publisher=4757914134515649&format=json&v=2&limit=1000';
const API_BASE = 'http://api.indeed.com/ads/apisearch';
const PAGING_CAP = 10; // arbitrary cap to speed things up
// const PAGING_CAP = 40; // arbitrary cap based on observed responses

function getQueries(): Promise<string[]> {
	return new Promise((resolve, reject) => {
		fs.readFile('./boom.txt', 'utf8', function(err: any, something: any) {
			if (err) {
				reject('Could not read file');
			}

			resolve(something.split('\n'));
		})
	});
}

function makeRequest<T>(options: any): Promise<T> {
	return new Promise((resolve, reject) => {
		request(options, function (error: any, response: any, body: string) {
			if (error) reject(new Error(error));
			resolve(JSON.parse(body));
		});
	});
}

async function doSearch(query: string, start: number = 1): Promise<Search.IResponse> {
	// `${API_BASE}&q=${query}&start=${start}`
	const options = { 
		method: 'GET',
		url: 'http://api.indeed.com/ads/apisearch',
		qs: { publisher: '4757914134515649',
			format: 'json',
			v: '2',
			limit: '1000',
			q: query,
			start: start
		},
		headers: { 'content-type': 'application/json' } 
	};
	const response = await makeRequest<Search.IResponse>(options);
	console.log(response.totalResults);
	return response;
}

function mapQueriesToRequest(queries: string[]): void {
	doSearch(queries[0]).then((thing) => {
		console.log('finished searching for...', thing.query);
	});
}

getQueries().then(mapQueriesToRequest);


// `${API_BASE}&q=${query}&start=${start}`
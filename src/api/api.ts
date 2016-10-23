import * as request from 'request';
import { Search } from '../models';

const API_BASE = 'http://api.indeed.com/ads/apisearch';
const PAGING_CAP = 10; // arbitrary cap to speed things up
// const PAGING_CAP = 40; // arbitrary cap based on observed responses

const EMPTY_RESPONSE: Search.IResponse = {
    version: 2,
    query: '',
    location: '',
    dupeFilter: true,
    paginationPayload: '',
    highlight: false,
    totalResults: 0,
    start: 1,
    end: 1,
    pageNumber: 1,
    results: []
};

export class API {

    static async makeRequestsWithQueries(queries: string[]): Promise<Search.IResponse[]> {
        const requests = queries.map(q => API._getPaginatedResults(q));
        return Promise.all(requests)
    }

    private static _buildRequest(query: string, start: number = 1): request.RequiredUriUrl & request.CoreOptions {
            return { 
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
    }

    private static _makeRequest(options: request.RequiredUriUrl & request.CoreOptions): Promise<Search.IResponse> {
        return new Promise((resolve, reject) => {
            request(options, function (error: any, response: any, body: string) {
                if (error) reject(new Error(error));
                resolve(JSON.parse(body));
            });
        });
    }

    private static async _getPaginatedResults(query: string, start: number = 1, prevResponse: Search.IResponse = EMPTY_RESPONSE): Promise<Search.IResponse> {
        console.log('Performing search for...', query, 'page:', prevResponse.pageNumber);
        const response = await API._makeRequest(API._buildRequest(query, start));
        const combinedResponse = Object.assign({}, prevResponse, response, {
            start: prevResponse.start,
            end: response.end,
            results: [
                ...prevResponse.results,
                ...response.results
            ]
        })
        if (response.pageNumber <= PAGING_CAP && response.end < response.totalResults) {
            return await API._getPaginatedResults(query, response.end, combinedResponse);
        }

        return combinedResponse;
    } 
}
import * as request from 'request';
import { Search } from '../models';

const API_BASE = 'http://api.indeed.com/ads/apisearch';
const PAGING_CAP = 10; // arbitrary cap to speed things up
// const PAGING_CAP = 40; // arbitrary cap based on observed responses

export class API {

    static async makeRequestsWithQueries(queries: string[]): Promise<Search.IResponse[]> {
        const requests = queries.map(q => API._makeRequest(API._buildRequest(q)));
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

}
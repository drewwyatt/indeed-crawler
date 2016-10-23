import { ISearchResult } from './search-result';

export interface ISearchResponse {
	version: number;
	query: string;
	location: string; 
	dupeFilter: boolean;
	paginationPayload: string;
	highlight: boolean;
	totalResults: number;
	start: number;
	end: number;
	pageNumber: number;
	results: ISearchResult[];
}

export class SearchResponse implements ISearchResponse {
	version: number = 2;
	query: string = '';
	location: string = ''; 
	dupeFilter: boolean = true;
	paginationPayload: string = '';
	highlight: boolean = false;
	totalResults: number = 0;
	start: number = 1;
	end: number = 1;
	pageNumber: number = 1;
	results: ISearchResult[] = [];

	constructor(response: ISearchResponse) {
		Object.keys(response).reduce(createDeserialzer(this, response));
	}

	get companies(): string[] {
		return this.results.reduce(this._companyReducer, []);
	}

	private _companyReducer(prev: string[], curr: ISearchResult): string[]{
		return prev.indexOf(curr.company) > -1 ? prev : [ ...prev,  curr.company ];
	}
}

function createDeserialzer<A extends Object, B extends Object>(deserialized: A, obj: B): (prev: string, curr: string) => string {
	return function (prev: string, curr: string): string {
		if (deserialized.hasOwnProperty(curr)) (deserialized as any)[curr] = (obj as any)[curr];
		return curr;
	}
}
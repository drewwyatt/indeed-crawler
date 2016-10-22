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


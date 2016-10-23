import { ISearchResponse, SearchResponse } from './search-response';
import { ISearchResult } from './search-result';

export namespace Search {
	export type IResponse = ISearchResponse;
	export type IResult = ISearchResult;

	export const Response = SearchResponse;
}
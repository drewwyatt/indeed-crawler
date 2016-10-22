export interface ISearchResult {
	jobtitle: string;
	company: string;
	city: string;
	state: string;
	country: string;
	formattedLocation: string;
	source: string;
	date: string;
	snippet: string;
	url: string;
	jobkey: string;
	sponsored: boolean;
	expired: boolean;
	indeedApply: boolean;
	formattedLocationFull: string;
	formattedRelativeTime: string;
}
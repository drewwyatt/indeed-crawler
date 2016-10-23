import * as fs from 'fs';
const json2csv: Function = require('json2csv');

export class IO {
    static GetQueries(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile('./queries.txt', 'utf8', function(err: any, queryLines: any) {
                if (err || typeof queryLines === 'undefined') {
                    throw new Error('Could not read queries from file. Please make sure "queries.txt" exists in the root of this application.');
                }

                resolve(queryLines.split('\n'));
            })
        });
    }

    static WriteToCSV<T>(data: T[], fields: string[]): void {
        fs.writeFile(IO._getFileName(), json2csv({
            data,
            fields
        }));
    }

    private static _getFileName(): string {
        const date = new Date();
        return `CrawlResults_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.csv`;
    }
}
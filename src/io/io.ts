import * as fs from 'fs';

export class IO {
    static GetQueries(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile('./boom.txt', 'utf8', function(err: any, something: any) {
                if (err) {
                    reject('Could not read file');
                }

                resolve(something.split('\n'));
            })
        });
    }
}
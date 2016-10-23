export namespace Utils {
    export function createObjectDeserialzer<A extends Object, B extends Object>(deserialized: A, obj: B): (prev: string, curr: string) => string {
        return function (prev: string, curr: string): string {
            if (deserialized.hasOwnProperty(curr)) (deserialized as any)[curr] = (obj as any)[curr];
            return curr;
        }
    }

    export function isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
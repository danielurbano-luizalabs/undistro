export function paginate(arr: any[], chunk: number) {
    let result: any[][] = [];
    for (let i = 0; i < arr.length; i += chunk) {
        let tempArray;
        tempArray = arr.slice(i, i + chunk);
        result.push(tempArray)
    }
    return result;
}
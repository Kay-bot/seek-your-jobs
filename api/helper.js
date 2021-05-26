export const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
};
// helper function to decode parameter from the search url to JS OBJ => ?search=javascript&location=sydney
export const decodeParams = (searchParams) =>
    Array.from(searchParams.keys()).reduce(
        (acc, key) => ({...acc, [key]: searchParams.get(key) }), {}
    );
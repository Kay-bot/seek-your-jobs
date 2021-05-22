const createServer = require('http').createServer;
const url = require('url');
const axios = require('axios');
const chalk = require('chalk');
const { app_id, app_key, port, BASE_URL, BASE_PARAMS } = require('./config');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

const server = createServer((req, res) => {
  const requestURL = url.parse(req.url);
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
  const { search, location, country = 'gb' } = decodedParams;

  const targetURL = `${BASE_URL}/${country.toLowerCase()}/${BASE_PARAMS}&app_id=${app_id}&app_key=${app_key}&what=${search}&where=${location}`;

  if (req.method === 'GET') {
    console.log(chalk.green(`Proxy GET request to : ${targetURL}`));
    axios
      .get(targetURL)
      .then((response) => {
        res.writeHead(200, headers);
        res.end(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(chalk.red(error));
        res.writeHead(500, headers);
        res.end(JSON.stringify(error));
      });
  }
});

server.listen(port, () => {
  console.log(chalk.green(`Server listening ${port}`));
});

console.log(BASE_URL);
console.log(BASE_PARAMS);
// helper function to decode parameter from the search url to JS OBJ => ?search=javascript&location=sydney
const decodeParams = (searchParams) =>
  Array.from(searchParams.keys()).reduce(
    (acc, key) => ({ ...acc, [key]: searchParams.get(key) }),
    {}
  );

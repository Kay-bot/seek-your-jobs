const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  app_id: process.env.APP_ID,
  app_key: process.env.APP_KEY,
  port: process.env.PORT,
  BASE_URL: 'https://api.adzuna.com/v1/api/jobs',
  BASE_PARAMS: 'search/1?&results_per_page=20&content-type=application/json',
};

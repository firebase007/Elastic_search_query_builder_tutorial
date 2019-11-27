const result = require('dotenv').config();

module.exports= {
es_host: process.env.ELASTICSEARCH_HOST,
es_pass: process.env.ELASTICSEARCH_PASSWORD,
es_port: process.env.ELASTICSEARCH_PORT,
es_user:process.env.ELASTICSEARCH_USERNAME,
es_index:process.env.ELASTICSEARCH_INDEX,
es_type:process.env.ELASTICSEARCH_TYPE,
app_port: process.env.APP_PORT
};


if (result.error) {
  console.log(result.error, "[Error Parsing env variables!]");
  throw result.error;
};

// console.log(result.parsed, '[Parsed env variables!]');

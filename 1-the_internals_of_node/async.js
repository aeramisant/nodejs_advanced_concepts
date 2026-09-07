const https = require('https');

const start = Date.now();
const url = 'https://google.com';

const doRequest = () =>
  https
    .request(url, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
// process.env.UV_THREADPOOL_SIZE = 5;
// process.env.UV_THREADPOOL_SIZE = 1;

const start = Date.now();
const url = 'https://google.com';

const doRequest = () =>
  https
    .request(url, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('https://...', Date.now() - start);
      });
    })
    .end();

const doHash = () =>
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('HASH: ' + (Date.now() - start));
  });

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS: ', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
// doHash();
// doHash();
// doHash();
// doHash();
// doHash();
// doHash();
// doHash();
// doHash();

process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
const crypto = require('crypto');
const express = require('express');
const app = express();

if (cluster.isMaster) {
  console.log('isMaster: ', cluster.isMaster);
  // Cause index.js to be executed "again", but in Slave Mode
  cluster.fork();
  // start additional children
  cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
} else {
  console.log('isMaster: ', cluster.isMaster, '------------------> Slave Mode');

  //   const doWork = (duration) => {
  //     const start = Date.now();
  //     while (Date.now() - start < duration) {
  //       console.log(Date.now() - start, duration);
  //     }
  //   };
  const response = { 1: 'a', 2: 'b' };

  app.get('/', (req, res) => {
    // doWork(5000);
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send({ message: 'God Of Code' });
    });
  });

  app.get('/fast', (req, res) => {
    res.send('FAST!!!!!!!!!!!!!!!!!!!!!');
  });

  app.listen('4000');
}

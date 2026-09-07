const crypto = require('crypto');
const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

const port = 4000;
const response = { 1: 'a', 2: 'b' };

app.get('/', (req, res) => {
  // Create a new worker for this request
  const worker = new Worker('./worker.js', {
    workerData: { password: 'a', salt: 'b' },
  });
  worker.on('message', (result) => {
    if (result.error) {
      res.status(500).send({ error: result.error });
      return;
    }
    console.log(result);
    res.send({
      message: 'God Of Code',
      hash: result.hash,
      counter: result.counter,
    });
  });
  worker.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.log(`Worker stopped with exit code ${code}`);
    }
  });

  //   crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  //     res.send({ message: 'God Of Code' });
  //   });
});

app.get('/fast', (req, res) => {
  res.send('FAST!!!!!!!!!!!!!!!!!!!!!');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

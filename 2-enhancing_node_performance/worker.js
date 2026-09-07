const { parentPort, workerData } = require('worker_threads');
const crypto = require('crypto');

// workerData comes from the main thread when you create the Worker
const { password, salt } = workerData;

// Heavy CPU work (same idea as your course's pbkdf2 example)
crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) {
    parentPort.postMessage({ error: err.message });
    return;
  }

  // Send result back to main thread
  let counter = 0;
  while (counter < 1e9) {
    counter++;
  }

  parentPort.postMessage({
    hash: derivedKey.toString('hex').slice(0, 20) + '...',
    counter: counter,
    done: true,
  });
});

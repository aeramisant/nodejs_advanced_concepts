const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

const hashData = {
  spanish: { red: 'rojo', orange: 'naranja', blue: 'azul' },
  german: { red: 'rot', orange: 'orange', blue: 'blau' },
};

// client.hset('german', 'red', 'rot');
client.set('colors', JSON.stringify(hashData));
// client.hget('german', 'red', console.log);
client.get('colors', (err, value) => console.log(JSON.parse(value)));
client.flushAll();

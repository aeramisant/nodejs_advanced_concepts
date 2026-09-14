const mongoose = require('mongoose');
const redis = require('redis');

const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    }),
  );

  // See if we have a value for 'key' in redis
  const cachedValue = await client.hget(this.hashKey, key);

  // If we do, return it
  if (cachedValue) {
    // console.log('CACHED VALUE FROM REDIS......: ', JSON.parse(cachedValue));
    const doc = JSON.parse(cachedValue);
    console.log('CACHED VALUE FROM REDIS......: ', doc);
    return Array.isArray(doc)
      ? doc.map((doc) => new this.model(doc))
      : new this.model(doc);
  }
  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
  console.log('STORE DATA IN REDIS: ..........', JSON.stringify(result));
  return result;
};

module.exports = {
  clearHash(hashKey) {
    console.log('CLEAR_HASH: ', hashKey);
    client.del(JSON.stringify(hashKey));
  },
};

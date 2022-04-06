const Redis = require('ioredis');
const env = require('dotenv');

env.config();

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

const setKey = (key, value) => {
  redis.set(key, value, 'EX', 360);
};
const getValue = (key) => redis.get(key);

module.exports = {
  setKey, getValue,
};

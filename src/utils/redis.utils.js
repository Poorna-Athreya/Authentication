const Redis = require('ioredis');

const redis = new Redis();

const setKey = (key, value) => {
  redis.set(key, value, 'EX', 360);
};
const getValue = (key) => redis.get(key);

module.exports = {
  setKey, getValue,
};

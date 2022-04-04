const { createHmac } = require('crypto');
const env = require('dotenv');

env.config();
const createToken = (username) => {
  const secret = process.env.SECRET;
  const hash = createHmac('sha256', secret)
    .update(username)
    .digest('hex');
  return hash;
};
module.exports = {
  createToken,
};

const InputError = require('../errors/InputError');
const services = require('../services/auth.services');

const authHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) throw new InputError('BadRequest', 'Invalid, username not given!', 400);
    else if (typeof username !== 'string') throw new InputError('BadRequest', 'Invalid, username should be valid string!', 400);
    if (!password) throw new InputError('BadRequest', 'Invalid, password not given!', 400);
    else if (typeof password !== 'string') throw new InputError('BadRequest', 'Invalid, password should be valid string!', 400);
    console.log(username, ' ', password);
    await services.authentication(username, password);
    res.json({ status: 200, message: 'Successfully logged in' }).status(200);
  } catch (err) {
    res.json({ error: err.message }).status(err.httpCode);
  }
};

module.exports = {
  authHandler,
};

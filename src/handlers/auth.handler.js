const AuthError = require('../errors/AuthError');
const InputError = require('../errors/InputError');
const services = require('../services/auth.services');

const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) throw new InputError('BadRequest', 'Invalid, username not given!', 400);
    else if (typeof username !== 'string') throw new InputError('BadRequest', 'Invalid, username should be valid string!', 400);
    if (!password) throw new InputError('BadRequest', 'Invalid, password not given!', 400);
    else if (typeof password !== 'string') throw new InputError('BadRequest', 'Invalid, password should be valid string!', 400);
    const result = await services.login(username, password);
    if (result.user !== '') {
      res.header('token', result.token);
      res.json(
        { status: 200, message: 'Successfully logged in', token: result.token },
      ).status(200);
    } else throw new InputError('BadRequest', 'No such username found!', 400);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(err.httpCode).json({ status: err.httpCode, message: err.message });
    }
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ status: err.httpCode, message: err.message });
    }
  }
};

const signupHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) throw new InputError('BadRequest', 'Invalid, username not given!', 400);
    else if (typeof username !== 'string') throw new InputError('BadRequest', 'Invalid, username should be valid string!', 400);
    if (!password) throw new InputError('BadRequest', 'Invalid, password not given!', 400);
    else if (typeof password !== 'string') throw new InputError('BadRequest', 'Invalid, password should be valid string!', 400);
    console.log('Handler');
    const message = await services.signup(username, password);
    res.status(200).json({ status: 200, message });
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.httpCode).json({ status: err.httpCode, message: err.message });
    }
    res.json({ status: err.httpCode, message: err.message }).status(err.httpCode);
  }
};

const validateToken = async (req, res) => {
  const { token } = req.headers;
  console.log(token);
  const user = await services.validateToken(token);
  res.status(200).json(user);
};
module.exports = {
  loginHandler,
  signupHandler,
  validateToken,
};

// const AuthError = require('../errors/AuthError');
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
    res.header('token', result.token);
    res.json(result).status(200);
    // if (result.length > 0) {
    // res.json(
    //   { status: 200, message: 'Successfully logged in' },
    // ).status(200);
    // } else throw new InputError('BadRequest', 'No such username found!', 400);
    // if (typeof result === 'string') res.json({ status: 201, message: result }).status(201);
    // res.json({ status: 200, message: 'Successfully logged in' }).status(200);
  } catch (err) {
    res.json({ status: err.httpCode, message: err.message }).status(err.httpCode);
  }
};

const signupHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) throw new InputError('BadRequest', 'Invalid, username not given!', 400);
    else if (typeof username !== 'string') throw new InputError('BadRequest', 'Invalid, username should be valid string!', 400);
    if (!password) throw new InputError('BadRequest', 'Invalid, password not given!', 400);
    else if (typeof password !== 'string') throw new InputError('BadRequest', 'Invalid, password should be valid string!', 400);
    const result = await services.login(username, password);
    // // res.json(result).status(200);
    // if (result.length > 0) {
    // res.json(
    //   { status: 200, message: 'Successfully logged in' },
    // ).status(200);
    // } else throw new InputError('BadRequest', 'No such username found!', 400);
    if (typeof result === 'string') res.json({ status: 201, message: result }).status(201);
    res.json({ status: 200, message: 'Successfully logged in' }).status(200);
  } catch (err) {
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

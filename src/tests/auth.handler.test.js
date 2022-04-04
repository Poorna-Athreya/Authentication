const AuthError = require('../errors/AuthError');
const handlers = require('../handlers/auth.handler');
const services = require('../services/auth.services');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const res = mockResponse();
describe('login Handler Function', () => {
  it('should return message woith status code 200 if login is successful', async () => {
    jest.spyOn(services, 'login').mockResolvedValue('Success!');
    const req = { body: { username: 'user', password: 'password' } };
    await handlers.loginHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'Successfully logged in' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it('should return invalid message if username not given', async () => {
    const req = { body: {} };
    try {
      await handlers.loginHandler(req, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ error: err.message });
      expect(res.status).toHaveBeenCalledWith(400);
    }
  });
  it('should return invalid message if password not given', async () => {
    const req = { body: { username: 'user' } };
    try {
      await handlers.loginHandler(req, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ error: err.message });
      expect(res.status).toHaveBeenCalledWith(400);
    }
  });
  it('should return invalid message if username not valid/ present in the database', async () => {
    jest.spyOn(services, 'login').mockResolvedValue([]);
    const req = { body: { username: 'user', password: 'password' } };
    try {
      await handlers.loginHandler(req, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ status: err.httpCode, message: 'No such username found!' });
      expect(res.status).toHaveBeenCalledWith(400);
    }
  });
  it('should return invalid message if password is not valid', async () => {
    jest.spyOn(services, 'login').mockResolvedValue(new AuthError('Unauthorised', 'Password incorrect!', 401));
    const req = { body: { username: 'user', password: 'password' } };
    try {
      await handlers.loginHandler(req, res);
    } catch (err) {
      expect(res.json).toHaveBeenCalledWith({ status: err.httpCode, message: err.message });
      expect(res.status).toHaveBeenCalledWith(401);
    }
  });
});

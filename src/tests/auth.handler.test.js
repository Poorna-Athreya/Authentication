const handlers = require('../handlers/auth.handler');
const services = require('../services/auth.services');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const res = mockResponse();
describe('Authentication Handler Function', () => {
  it('should return message woith status code 200 if login is successful', async () => {
    jest.spyOn(services, 'authentication').mockResolvedValue('Success!');
    const req = { body: { username: 'user', password: 'password' } };
    await handlers.authHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'Successfully logged in' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it('should return invalid message if username not given', async () => {

  });
  it('should return invalid message if password not given', async () => {

  });
  it('should return invalid message if username not valid/ present in the database', async () => {

  });
  it('should return invalid message if password is not valid', async () => {

  });
});
// git commit -m "Feat: Basic login endpoint for success cases"

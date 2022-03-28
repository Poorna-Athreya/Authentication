class InputError extends Error {
  httpCode;

  constructor(name, message, httpCode, errors) {
    super();
    this.name = name;
    this.message = message;
    this.httpCode = httpCode;
    this.errors = errors;
  }
}
module.exports = InputError;

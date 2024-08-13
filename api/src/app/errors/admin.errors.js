class AdminNotFoundError extends Error {
    constructor(message = 'Admin não encontrado') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 404;
    }
  }
  
  class InvalidCredentialsError extends Error {
    constructor(message = 'Credenciais inválidas') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 401;
    }
  }
  
  module.exports = {
    AdminNotFoundError,
    InvalidCredentialsError,
  };
  
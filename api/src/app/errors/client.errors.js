class ClientNotFoundError extends Error {
    constructor(message = 'Cliente não encontrado') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 404;
    }
  }
  
  class DatabaseError extends Error {
    constructor(message = 'Erro no banco de dados') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 500;
    }
  }
  
  module.exports = {
    ClientNotFoundError,
    DatabaseError,
  };
  
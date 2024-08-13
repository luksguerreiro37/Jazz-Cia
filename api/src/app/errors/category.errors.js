
class CategoryNotFoundError extends Error {
    constructor(message = 'Categoria não encontrada') {
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
    CategoryNotFoundError,
    DatabaseError,
  };
  
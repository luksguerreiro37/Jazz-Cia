class ProductNotFoundError extends Error {
    constructor(message = 'Produto não encontrado') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 404;
    }
  }
  
  module.exports = {
    ProductNotFoundError,
  };
  
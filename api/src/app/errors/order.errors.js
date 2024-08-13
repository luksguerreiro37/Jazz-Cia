class OrderNotFoundError extends Error {
    constructor(message = 'Pedido não encontrado') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 404;
    }
  }
  
  module.exports = {
    OrderNotFoundError,
  };
  
class ClientNotFoundError extends Error {
    constructor(message) {
      super(message || 'Usuário não encontrado');
      this.name = 'ClientNotFoundError';
    }
  }
  
  class InvalidPasswordError extends Error {
    constructor(message) {
      super(message || 'Senha incorreta');
      this.name = 'InvalidPasswordError';
    }
  }
  
  class AdminNotFoundError extends Error {
    constructor(message) {
      super(message || 'Administrador não encontrado');
      this.name = 'AdminNotFoundError';
    }
  }
  
  class InvalidEmailOrPasswordError extends Error {
    constructor(message) {
      super(message || 'Email ou senha incorretos');
      this.name = 'InvalidEmailOrPasswordError';
    }
  }

  class InvalidTokenError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidTokenError';
    }
  }
  
  module.exports = {
    ClientNotFoundError,
    InvalidPasswordError,
    AdminNotFoundError,
    InvalidEmailOrPasswordError,
    InvalidTokenError,
  };
  
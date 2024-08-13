# About
API que administra contas de usuários clientes e administradores, além de suas funções e capacidades.

# Installation
npm i

configurar o .env com as informações do banco de dados(obs, as tabelas serão criadas automaticamente no banco postgresql ao executar a api)

npm start

npx sequelize-cli db:seed:all (para criar os seeders de usuarios admin)
# Usage
**Autenticação**
    *POST /auth/client*
        Rota para autenticar um cliente.
        Corpo da Requisição:
        json
        Copy code
        {
            "usernameOrEmail": "string",
            "password": "string"
        }
        Resposta: Retorna um token de acesso.

    *POST /auth/admin*
        Rota para autenticar um administrador.
        Corpo da Requisição:
        {
            "usernameOrEmail": "string",
            "password": "string"
        }
        Resposta: Retorna um token de acesso.
        


**Rotas do Cliente**
    *POST /client*
        Cria um novo usuário cliente.
        Corpo da Requisição:
        {
            "name": "string",
            "mail": "string",
            "password": "string",
            "username": "string"
        }
        Resposta: Retorna os detalhes do usuário cliente recém-criado.

    *POST /client/send-recovery*
        Envia um código de recuperação para o email do cliente.
        Corpo da Requisição:
        {
            "email": "string"
        }
        Resposta: Retorna uma mensagem de sucesso.

    *POST /client/change-password*
        Atualiza a senha do cliente com o código de recuperação.
        Corpo da Requisição:
        {
            "email": "string",
            "recoveryCode": "string",
            "newPassword": "string"
        }
        Resposta: Retorna uma mensagem de sucesso.

    *GET /client*
        Retorna os detalhes do usuário cliente com base no token de acesso.

    *PUT /client*
        Atualiza os detalhes do usuário cliente.
        Corpo da Requisição:
        json
        {
        "name": "string",
        "mail": "string",
        "password": "string",
        "username": "string"
        }
        Resposta: Retorna os detalhes atualizados do usuário cliente.

    *DELETE /client*
        Exclui o usuário cliente.

**Rotas do Administrador**
    GET /admin
        Retorna os detalhes do usuário administrador com base no token de acesso.

    PUT /admin
        Atualiza os detalhes do usuário administrador.
        Corpo da Requisição:
        json
            {
            "name": "string",
            "mail": "string",
            "password": "string",
            "username": "string"
            }
        Resposta: Retorna os detalhes atualizados do usuário administrador.

    GET /admin/user
        Retorna todos os usuários cadastrados.

    POST /admin/user
        Cria um novo usuário.
        Corpo da Requisição:
        json
        {
            "name": "string",
            "mail": "string",
            "password": "string",
            "username": "string"
        }
        Resposta: Retorna os detalhes do usuário recém-criado.

    DELETE /admin/user/:id
        Exclui um usuário pelo ID.

    PUT /admin/user/:id
        Atualiza os detalhes de um usuário pelo ID.
        Corpo da Requisição:
            {
                "name": "string",
                "mail": "string",
                "password": "string",
                "username": "string"
            }
        Resposta: Retorna os detalhes atualizados do usuário.

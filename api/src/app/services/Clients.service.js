const AppError = require("../errors/AppError");
const Clients = require("../models/Clients");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const Order = require("../models/Orders"); 

class ClientsService {
    async findUserById(id) {
        const client = await Clients.findByPk(id);
        if (!client) {
            throw new AppError(404, "Cliente não encontrado!");
        }
        return client;
    }

    async findClientByUsernameOrEmail(usernameOrEmail) {
        const client = await Clients.findOne({
            where: {
                [Op.or]: [
                    { mail: usernameOrEmail },
                    { username: usernameOrEmail }
                ]
            }
        });
        return client;
    }

    async getAllClients() {
        try {
            const clients = await Clients.findAll();
            return clients;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async createClient(name, mail, password, username, phone_number, hash = true) {
        try {
            const clientAlreadyExists = await this.findClientByUsernameOrEmail(mail);
            if (clientAlreadyExists) {
                throw new AppError(409, "Email já cadastrado!");
            }
            if (hash === false) {
                await Clients.create({
                    name,
                    mail,
                    password,
                    username,
                    phone_number
                });

                return { message: `Cliente criado com sucesso! senha => ${password}` };
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            await Clients.create({
                name,
                mail,
                password: hashedPassword,
                username,
                phone_number
            });

            return { message: "Cliente criado com sucesso!" };
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async updateClient(id, newData) {
        try {
            const client = await Clients.findByPk(id);

            if (!client) {
                throw new AppError(404, "Cliente não encontrado!");
            }

            if (newData.password) {
                newData.password = await bcrypt.hash(newData.password, 8);
            }

            await client.update(newData);

            return client;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async deleteClient(id) {
        try {
            const client = await Clients.findByPk(id);
            if (!client) {
                throw new AppError(404, "Cliente não encontrado!");
            }

            await Clients.destroy({ where: { id } });
            return { message: "Cliente deletado com sucesso" };
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }


    async getClientOrders(clientId) {
        try {
            const client = await Clients.findByPk(clientId, {
                include: [{ model: Order, as: 'orders' }]
            });

            if (!client) {
                throw new AppError(404, "Cliente não encontrado!");
            }

            return client.orders;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
}

module.exports = new ClientsService();

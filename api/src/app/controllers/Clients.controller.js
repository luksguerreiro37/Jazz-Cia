const UserSchemas = require("../schemas/User/User.schemas");
const ClientUsersService = require("../services/Clients.service");
const { ClientNotFoundError, DatabaseError } = require("../errors/client.errors");

class ClientUsersController {
    async getAllClients(req, res) {
        try {
            const clients = await ClientUsersService.getAllClients();
            return res.status(200).json(clients);
        } catch (error) {
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async createClient(req, res) {
        try {
            const { name, mail, username, phone_number } = req.body;
            let { password } = req.body;

            const isInvalid = UserSchemas.createUserSchema(name, mail, password, username, phone_number);

            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });

                return res.status(400).json({ message: "Erro de validação", errors });
            }

            const response = await ClientUsersService.createClient(
                name,
                mail,
                password,
                username,
                phone_number
            );
            return res.status(201).json(response);
        } catch (error) {
            if (error instanceof ClientNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getClientDataTokenBased(req, res) {
        try {
            const clientId = req.userId;
            if (!clientId) {
                return res.status(401).json({ message: 'Usuário não autenticado' });
            }
            const clientData = await ClientUsersService.findUserById(clientId);
            console.log(clientData);
            return res.status(200).json(clientData);
        } catch (error) {
            if (error instanceof ClientNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async deleteClient(req, res) {
        try {
            const clientId = req.userId;
            await ClientUsersService.deleteClient(clientId);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof ClientNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async updateClient(req, res) {
        try {
            const clientId = req.userId;
            const { name, mail, password, username, phone_number } = req.body;

            const isInvalid = UserSchemas.createUserSchema(name, mail, password, username, phone_number);

            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });

                return res.status(400).json({ message: "Erro de validação", errors });
            }

            const updatedClient = await ClientUsersService.updateClient(clientId, {
                name,
                mail,
                password,
                username,
                phone_number
            });

            return res.status(200).json(updatedClient);
        } catch (error) {
            if (error instanceof ClientNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getClientOrders(req, res) {
        try {
            const clientId = req.params.clientId;
            const orders = await ClientUsersService.getClientOrders(clientId);
            return res.status(200).json(orders);
        } catch (error) {
            if (error instanceof ClientNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

}

module.exports = new ClientUsersController();

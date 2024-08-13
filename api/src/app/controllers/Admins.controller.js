const UserSchemas = require("../schemas/User/User.schemas");
const AdminUsersService = require("../services/Admins.service");
const ClientUsersService = require("../services/Clients.service")

class AdminUsersController {
    async getUserDataTokenBased(req, res) {
        try {
            const userId = req.userId;
            const userData = await AdminUsersService.findUserById(userId);
            return res.status(200).json(userData);
        } catch(error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.userId;
            await AdminUsersService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.userId;
            const { name, mail, password, username } = req.body;
            
            const isInvalid = UserSchemas.createUserSchema(
                name,
                mail,
                password,
                username
            );
    
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });
                
                return res.status(400).json({ message: "Erro de validação", errors });
            }
    
            const updatedUser = await AdminUsersService.updateUser(userId, {
                name,
                mail,
                password,
                username
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async deleteClientUser(req, res) {
        try {
            const userId = req.params.id;
            await ClientUsersService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async updateClientUser(req, res) {
        try {
            const userId = req.params.id;
            const { name, mail, password, username } = req.body;
    
            const isInvalid = UserSchemas.editUserSchema(
                name,
                mail,
                password,
                username
            );
    
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });
                
                return res.status(400).json({ message: "Erro de validação", errors });
            }
    
            const updatedFields = {};

            if (name !== undefined && name !== "") {
                updatedFields.name = name;
            }

            if (mail !== undefined && mail !== "") {
                updatedFields.mail = mail;
            }

            if (password !== undefined && password !== "") {
                updatedFields.password = password;
            }

            if (username !== undefined && username !== "") {
                updatedFields.username = username;
            } 
            const updatedUser = await ClientUsersService.updateUser(userId, updatedFields);
    
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
    
}

module.exports = new AdminUsersController();

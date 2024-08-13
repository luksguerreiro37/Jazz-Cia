const { Op } = require("sequelize");
const AppError = require("../errors/AppError");
const Admins = require("../models/Admins");

class AdminsService {
    async findUserById(id){
        const user = await Admins.findByPk(id);
        return user;
    }

    async findUserByUsernameOrEmail(usernameOrEmail) {
        const user = await Admins.findOne({
            where: {
                [Op.or]: [
                    { mail: usernameOrEmail },
                    { username: usernameOrEmail }
                ]
            }
        });
        return user;
    }

    async updateAdmin(id, newData) {
        try {
            const user = await Admins.findByPk(id);
            
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }
    
            await user.update(newData);
    
            return user;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
    

    async deleteAdmin(id) {
        try {
            const user = await Admins.findByPk(id);
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }

            await Admins.destroy({ where: { id } });
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
}

module.exports = new AdminsService();

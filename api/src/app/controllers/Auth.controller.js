const AdminUsersService = require("../services/Admins.service");
const ClientUsersService = require("../services/Clients.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

class AuthController {
    async loginAdmin(req, res) {
        try {
            const { usernameOrEmail, password } = req.body;

            const adminUser = await AdminUsersService.findUserByUsernameOrEmail(usernameOrEmail);
            if (!adminUser) {
                throw new AppError(401, "Email ou usuário não registrado.");
            }

            const passwordMatch = await bcrypt.compare(password, adminUser.password);
            if (!passwordMatch) {
                throw new AppError(401, "Senha não corresponde a este email!");
            }

            const token = jwt.sign({ id: adminUser.id, userType: 'admin' }, process.env.JWT_SECRET, {
                expiresIn: '12h' 
            });

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async loginClient(req, res) {
        try {
            const { usernameOrEmail, password } = req.body;
    
            const clientUser = await ClientUsersService.findClientByUsernameOrEmail(usernameOrEmail);
            if (!clientUser) {
                throw new AppError(401, "Nome de usuário ou email não cadastrado!");
            }
    
            let passwordMatch = false;
            if (clientUser.password.startsWith('$2b$')) {
                passwordMatch = await bcrypt.compare(password, clientUser.password);
            } else { 
                passwordMatch = password === clientUser.password;
            }
    
            if (!passwordMatch) {
                clientUser.loginFails += 1;
                clientUser.lastLogin = new Date();
                await clientUser.save();    
                throw new AppError(401, "Senha incorreta!");
            }
            
            await clientUser.save();
            
            const token = jwt.sign({ id: clientUser.id, userType: 'client' }, process.env.JWT_SECRET, {
                expiresIn: '12h' 
            });
            
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
        
    static generateRandomPassword() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let password = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          password += chars[randomIndex];
        }
        return password;
    }
}

module.exports = new AuthController();

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../errors/AppError");
const ClientUsersService = require("../services/Clients.service");

const verifyAsync = promisify(jwt.verify);

const isClientAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            throw new AppError(401, "Token de autenticação não fornecido");
        }

        const accessToken = token.split(" ")[1];

        if (!isValidJwtFormat(accessToken)) {
            throw new AppError(401, "Token de autenticação inválido");
        }

        const decoded = await verifyAsync(accessToken, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await ClientUsersService.findUserById(userId);
        if (!user) {
            throw new AppError(403, "Acesso não autorizado. Você não é um cliente.");
        }

        req.userId = userId;
        next();
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

function isValidJwtFormat(token) {
    const jwtRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;
    return jwtRegex.test(token);
}

module.exports = isClientAuthenticated;

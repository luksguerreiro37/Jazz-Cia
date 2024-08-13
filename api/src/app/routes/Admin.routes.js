const { Router } = require("express");
const isAdminAuthenticated = require("../middlewares/isAdminAuthenticated");
const routes = Router();

const AdminUsersController = require("../controllers/Admins.controller")

routes.get("", isAdminAuthenticated, AdminUsersController.getUserDataTokenBased);

module.exports = routes;
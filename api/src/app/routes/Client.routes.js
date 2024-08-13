const { Router } = require("express");
const routes = Router();

const ClientUsersController = require("../controllers/Clients.controller")
const isClientAuthenticated = require("../middlewares/isClientAuthenticated");

routes.post("", ClientUsersController.createClient);
routes.get("", isClientAuthenticated, ClientUsersController.getClientDataTokenBased);
routes.put("", isClientAuthenticated, ClientUsersController.updateClient);
routes.delete("", isClientAuthenticated, ClientUsersController.deleteClient);

module.exports = routes;
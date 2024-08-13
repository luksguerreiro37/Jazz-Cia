const { Router } = require("express");
const routes = Router();

const AuthRoutes = require("./Auth.routes");
const AdminUserRoutes = require("./Admin.routes");
const ClientUserRoutes = require("./Client.routes")
const OrdersRoutes = require("./Order.routes")
const CategoriesRoutes = require("./Category.routes")
const ProductsRoutes = require("./Product.routes")

routes.use("/login", AuthRoutes);
routes.use("/admin", AdminUserRoutes);
routes.use("/client", ClientUserRoutes);
routes.use("/orders", OrdersRoutes)
routes.use("/category", CategoriesRoutes)
routes.use("/products", ProductsRoutes)


module.exports = routes;


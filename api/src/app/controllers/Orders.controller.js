const OrdersService = require("../services/Orders.service");
const { OrderNotFoundError } = require("../errors/order.errors");
const { DatabaseError } = require("../errors/client.errors")

class OrdersController {
    // Obter todas as ordens
    async getAllOrders(req, res) {
        try {
            const orders = await OrdersService.getAllOrders();
            return res.status(200).json(orders);
        } catch (error) {
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Criar uma nova ordem
    async createOrder(req, res) {
        try {
            const clientId = req.userId;  // Pega o ID do cliente autenticado a partir do middleware
            const orderData = req.body;    // Dados da ordem enviados no corpo da requisição
    
            const response = await OrdersService.createOrder(clientId, orderData);
            return res.status(201).json(response);
        } catch (error) {
            if (error instanceof OrderNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Deletar uma ordem
    async deleteOrder(req, res) {
        try {
            const { orderId } = req.params;
            const userId = req.userId;
            const userType = req.userType

    
            if (userType === "Admin") {
                const response = await OrdersService.deleteOrder(orderId);
                return res.status(200).json(response);
            }
    
            if (userType === "Client") {
                const order = await OrdersService.getOrderById(orderId);
                if (order.clientId !== userId) {
                    return res.status(403).json({ message: "Você não tem permissão para excluir esta ordem" });
                }
                const response = await OrdersService.deleteOrder(orderId);
                return res.status(200).json(response);
            }
    
            return res.status(403).json({ message: "Permissão negada" });
    
        } catch (error) {
            if (error instanceof OrderNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const response = await OrdersService.updateOrderStatus(orderId);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof OrderNotFoundError || error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

module.exports = new OrdersController();

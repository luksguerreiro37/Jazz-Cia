const { Op } = require("sequelize");
const Orders = require("../models/Orders");
const Clients = require("../models/Clients");
const Products = require("../models/Products");
const { OrderNotFoundError } = require("../errors/order.errors");
const { DatabaseError, ClientNotFoundError } = require("../errors/client.errors");

class OrdersService {
    // Obter todas as ordens
    async getAllOrders() {
        try {
            return await Orders.findAll({
                include: [
                    {
                        model: Clients,
                        as: 'client',
                        attributes: ['name', 'phone_number', 'mail'],
                    }
                ]
            });
        } catch (error) {
            throw new DatabaseError();
        }
    }

    // Criar uma nova ordem
    async createOrder(clientId, orderData) {
        try {
            console.log("Iniciando a criação da ordem...");

            // Verifica se o cliente existe
            console.log("Verificando a existência do cliente com ID:", clientId);
            const client = await Clients.findByPk(clientId);

            if (!client) {
                console.log("Cliente não encontrado:", clientId);
                throw new ClientNotFoundError();
            }
            console.log("Cliente encontrado:", client.name);

            // Buscar informações dos produtos
            const itemsWithDetails = await Promise.all(orderData.items.map(async item => {
                const product = await Products.findByPk(item.product_id);
                if (!product) {
                    throw new Error(`Produto com ID ${item.product_id} não encontrado.`);
                }
                return {
                    product_id: item.product_id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    quantity: item.quantity
                };
            }));

            // Cria a ordem associada ao cliente com os detalhes dos produtos
            console.log("Criando a ordem com os seguintes dados:", {
                ...orderData,
                items: itemsWithDetails
            });
            const order = await Orders.create({
                ...orderData,
                items: itemsWithDetails,
                client_id: clientId
            });

            console.log("Ordem criada com sucesso:", order.id);

            // Buscar a ordem recém-criada com detalhes do cliente
            const orderWithClientDetails = await Orders.findByPk(order.id, {
                include: [
                    {
                        model: Clients,
                        as: 'client',
                        attributes: ['name', 'phone_number', 'mail'],
                    }
                ]
            });

            return {
                id: orderWithClientDetails.id,
                items: orderWithClientDetails.items,
                value: orderWithClientDetails.value,
                created_at: orderWithClientDetails.created_at,
                is_open: orderWithClientDetails.is_open,
                client_name: orderWithClientDetails.client.name,
                client_phone: orderWithClientDetails.client.phone_number,
                client_email: orderWithClientDetails.client.mail,
                client_id: clientId
            };

        } catch (error) {
            console.error("Erro ao criar ordem:", error);

            if (error instanceof ClientNotFoundError) {
                return { message: "Cliente não encontrado!", error };
            }
            return { message: "Erro ao criar ordem!", error };
        }
    }

    // Deletar uma ordem
    async deleteOrder(orderId) {
        try {
            const order = await Orders.findByPk(orderId);
            if (!order) {
                throw new OrderNotFoundError();
            }

            if (!order.is_open) {
                return { message: "Pedido não pode ser deletado porque não está aberto." };
            }

            await Orders.destroy({ where: { id: orderId } });
            
            const orders = await this.getAllOrders();
            return { message: "Ordem deletada com sucesso!", orders };
        } catch (error) {
            if (error instanceof OrderNotFoundError) {
                throw error;
            }
            throw new DatabaseError();
        }
    }

    // Atualizar o estado `is_open` de uma ordem para o valor oposto
    async updateOrderStatus(orderId) {
        try {
            const order = await Orders.findByPk(orderId);
            if (!order) {
                throw new OrderNotFoundError();
            }

            const newIsOpenStatus = !order.is_open;
            await order.update({ is_open: newIsOpenStatus });

            const orders = await this.getAllOrders();
            return { message: "Estado da ordem atualizado com sucesso!", orders };
        } catch (error) {
            if (error instanceof OrderNotFoundError) {
                throw error;
            }
            throw new DatabaseError();
        }
    }
}

module.exports = new OrdersService();

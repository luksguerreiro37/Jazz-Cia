const ProductsService = require('../services/Products.service');
const { ProductNotFoundError } = require('../errors/product.errors');
const { DatabaseError } = require('../errors/category.errors');

class ProductsController {
    // Pega todos os produtos
    async getAllProducts(req, res) {
        try {
            const products = await ProductsService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Cria um novo produto
    async createProduct(req, res) {
        try {
            const { name, price, description, category } = req.body;

            if (!name || !price || !description || !category) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }

            const products = await ProductsService.createProduct(name, price, description, category);
            return res.status(201).json(products);
        } catch (error) {
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Atualiza um produto
    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const { name, price, description, category } = req.body;

            if (!name && !price && !description && !category) {
                return res.status(400).json({ message: "Pelo menos um campo deve ser fornecido para atualização" });
            }

            const products = await ProductsService.updateProduct(productId, {
                name,
                price,
                description,
                category
            });
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Deleta um produto
    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const products = await ProductsService.deleteProduct(productId);
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Alterna o valor de hadImage
    async toggleHadImage(req, res) {
        try {
            const productId = req.params.id;
            const products = await ProductsService.toggleHadImage(productId);
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            if (error instanceof DatabaseError) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

module.exports = new ProductsController();

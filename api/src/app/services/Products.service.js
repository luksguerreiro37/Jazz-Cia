const Product = require("../models/Products");
const { DatabaseError } = require("../errors/category.errors");
const { ProductNotFoundError } = require("../errors/product.errors");

class ProductsService {
    // Obter todos os produtos
    async getAllProducts() {
        try {
            const products = await Product.findAll();
            return products;
        } catch (error) {
            throw new DatabaseError("Erro ao buscar produtos");
        }
    }

    // Criar um novo produto
    async createProduct(name, price, description, category) {
        try {
            await Product.create({ name, price, description, category });
            return await this.getAllProducts();  // Retorna todos os produtos após criar
        } catch (error) {
            throw new DatabaseError("Erro ao criar produto");
        }
    }

    // Atualizar um produto
    async updateProduct(id, updatedData) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new ProductNotFoundError();
            }

            await product.update(updatedData);
            return await this.getAllProducts();  // Retorna todos os produtos após atualizar
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                throw error;
            }
            throw new DatabaseError("Erro ao atualizar produto");
        }
    }

    // Deletar um produto
    async deleteProduct(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new ProductNotFoundError();
            }

            await Product.destroy({ where: { id } });
            return await this.getAllProducts();  // Retorna todos os produtos após deletar
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                throw error;
            }
            throw new DatabaseError("Erro ao deletar produto");
        }
    }

    async toggleHadImage(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new ProductNotFoundError();
            }

            const updatedHadImage = !product.hadImage;

            await product.update({ hadImage: updatedHadImage });

            return await this.getAllProducts();
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                throw error;
            }
            throw new DatabaseError("Erro ao alternar hadImage do produto");
        }
    }
}

module.exports = new ProductsService();

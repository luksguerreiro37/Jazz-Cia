const CategoriesService = require("../services/Categories.service");
const { CategoryNotFoundError, DatabaseError } = require("../errors/category.errors");

class CategoriesController {
    // Obter todas as categorias
    async getAllCategories(req, res) {
        try {
            const categories = await CategoriesService.getAllCategories();
            return res.status(200).json(categories);
        } catch (error) {
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Criar uma nova categoria
    async createCategory(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: "Nome da categoria é obrigatório" });
            }

            const response = await CategoriesService.createCategory(name);
            return res.status(201).json(response);
        } catch (error) {
            if (error.message === 'Categoria já existe') {
                return res.status(409).json({ message: error.message });
            }
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Deletar uma categoria
    async deleteCategory(req, res) {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);
            if (isNaN(categoryId)) {
                return res.status(400).json({ message: "ID da categoria inválido" });
            }

            const response = await CategoriesService.deleteCategory(categoryId);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof CategoryNotFoundError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            if (error instanceof DatabaseError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

module.exports = new CategoriesController();

const Category = require("../models/Categories");
const { CategoryNotFoundError, DatabaseError } = require("../errors/category.errors");

class CategoriesService {
    // Obter todas as categorias
    async getAllCategories() {
        try {
            return await Category.findAll();
        } catch (error) {
            throw new DatabaseError();
        }
    }

    // Criar uma nova categoria
    async createCategory(name) {
        try {
            // Verifica se a categoria já existe
            const existingCategory = await Category.findOne({ where: { name } });
            if (existingCategory) {
                throw new DatabaseError('Categoria já existe');
            }

            // Cria a nova categoria
            const category = await Category.create({ name });

            const categories = await this.getAllCategories();
            return { message: "Categoria criada com sucesso!", categories };
        } catch (error) {
            if (error.message === 'Categoria já existe') {
                throw new DatabaseError('Categoria já existe');
            }
            throw new DatabaseError();
        }
    }

    // Deletar uma categoria
    async deleteCategory(categoryId) {
        try {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                throw new CategoryNotFoundError();
            }

            await Category.destroy({ where: { id: categoryId } });
            
            // Retorna a lista de todas as categorias após a deleção
            const categories = await this.getAllCategories();
            return { message: "Categoria deletada com sucesso!", categories };
        } catch (error) {
            if (error instanceof CategoryNotFoundError) {
                throw error;
            }
            throw new DatabaseError();
        }
    }
}

module.exports = new CategoriesService();

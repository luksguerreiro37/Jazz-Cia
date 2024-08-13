const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                }
            },
            {
                sequelize,
                modelName: "Category",
                tableName: "Categories"
            }
        );
    }
}

module.exports = Category;

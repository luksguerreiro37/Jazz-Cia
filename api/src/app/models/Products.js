const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                hadImage: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                modelName: "Product",
                tableName: "Products"
            }
        );
    }
}

module.exports = Product;

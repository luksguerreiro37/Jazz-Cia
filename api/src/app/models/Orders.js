const { Sequelize, Model, DataTypes } = require('sequelize');

class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                items: {
                    type: DataTypes.JSON,
                    allowNull: false
                },
                value: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW
                },
                is_open: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                }
            },
            {
                sequelize,
                modelName: "Order",
                tableName: "Orders",
                timestamps: false,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    }
}

module.exports = Order;

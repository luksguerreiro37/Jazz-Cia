const { Sequelize, Model, DataTypes } = require('sequelize');

class Clients extends Model {
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
                mail: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                phone_number: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Client", // Alterado para "Client" para consistência com outras referências
                tableName: "Clients",
                timestamps: false // Ajuste conforme necessário
            }
        );
    }

    static associate(models) {
        // Assegure-se de que "models.Order" é referenciado corretamente
        this.hasMany(models.Order, { foreignKey: 'client_id', as: 'orders' });
    }
}

module.exports = Clients;

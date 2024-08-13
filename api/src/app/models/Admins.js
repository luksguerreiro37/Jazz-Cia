const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");

class Admins extends Model {
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
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                mail: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'Admins',
                tableName: 'Admins'
            }
        );

        this.addHook("beforeSave", async (admin) => {
            admin.password = await bcrypt.hash(admin.password, 8);
        });
    }
}

module.exports = Admins;

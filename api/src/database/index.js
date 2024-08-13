const { Sequelize } = require('sequelize');
const { development } = require('../config/database');
const Admin = require('../app/models/Admins');
const Client = require('../app/models/Clients');
const Category = require('../app/models/Categories');
const Order = require('../app/models/Orders');
const Product = require('../app/models/Products');

const models = [Admin, Client, Category, Order, Product];

class Database {
    constructor() {
        this.init();
    }

    init() {
        const { database, username, password, host, dialect, port } = development;
        this.connection = new Sequelize(database, username, password, {
            host,
            dialect,
            port,
            define: {
                timestamps: true,
                underscored: true,
            },
        });

        // Inicializar os modelos
        models.forEach(model => {
            if (model.init) {
                model.init(this.connection);
            }
        });

        // Associar os modelos
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });

        this.connection.sync({ alter: true })
            .then(() => {
                console.log('Tabelas sincronizadas com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao sincronizar tabelas:', err);
            });
    }
}

module.exports = new Database();

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const routes = require("../app/routes/routes");
const sequelize = require("../database/index").sequelize;
const { exec } = require('child_process');

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.delayedRunSeeder();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(compression());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    delayedRunSeeder() {
        setTimeout(() => {
            this.runSeeder();
        }, 3000);
    }

    runSeeder() {
        exec('npx sequelize-cli db:seed:all', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao rodar o comando do seeder: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erro ao rodar o comando do seeder: ${stderr}`);
                return;
            }
            console.log(`Comando do seeder rodado com sucesso: ${stdout}`);
        });
    }
}

module.exports = new App().server;

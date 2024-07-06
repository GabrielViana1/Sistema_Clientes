// Arquivo1: api.js

const express = require('express'); // Importando express
const api = express(); // Instância para manipulação de rotas
const app = require("./src/app"); // Importando configurações realizadas no app
require('dotenv').config();

api.use(express.json()); // Analisa corpo da req como JSON 

api.use(app); // Montando aplicação na raiz

api.listen(process.env.PORT_SERVER, () => { // Iniciando servidor
  console.log(`Servidor rodando em http://localhost:${process.env.PORT_SERVER}`);
});

module.exports = api;

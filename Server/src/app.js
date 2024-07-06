const express = require('express'); // Importando o módulo 'express' para criar um aplicativo de servidor HTTP.
const app = express(); // Criando uma instância de um aplicativo Express.
const cors = require('cors'); // Importando o módulo 'cors' para habilitar o Cross-Origin Resource Sharing (CORS).
const Clientes = require("./controllers/clientesController"); // Importando o controlador de cadastro de clientes.
const Endereco = require("./controllers/enderecoControllers"); // Importando o controlador de cadastro de endereços.
const Contatos = require("./controllers/contatoControllers"); // Importando o controlador de cadastro de contatos.

app.use(cors()); // Habilitando o middleware CORS no aplicativo.
app.use(express.json()); // Analisa corpo da requisição como JSON 

app.use(Clientes); // Utilizando o controlador de cadastro de clientes como middleware para rota raiz.
app.use(Endereco); // Utilizando o controlador de cadastro de endereços como middleware para rota raiz.
app.use(Contatos); // Utilizando o controlador de cadastro de contatos como middleware para rota raiz.

module.exports = app; // Exportando o aplicativo Express para uso em outros módulos.

const db = require('mssql');
require('dotenv').config();

// Configurações de conexão
const config = {
  server: process.env.SERVER_DB,
  database: process.env.DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  options: {
    encrypt: true,
    trustServerCertificate: true // Configurar para confiar no certificado do servidor
  }
};


// Função para conectar ao banco de dados
async function connect() {
  try {
    // Estabelece a conexão
    db.connect(config);
    console.log('Conexão estabelecida com sucesso!');

    // Executa consultas ou outras operações aqui...

  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
}

// Chama a função para conectar ao banco de dados
connect();

module.exports = db; // Exporta o módulo mssql para ser usado em outros arquivos

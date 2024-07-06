// Importando o módulo Express.
const express = require("express");

// Criando um roteador do Express para o controle de clientes.
const enderecoController = express.Router();

const Endereco = require('../db_querys/endereco');

// Rota para cadastrar um novo endereço.
enderecoController.post('/cadEndereco', async function (req, res) {
    // Extrai os dados do corpo da requisição.
    const dados = {
        clienteId: req.body.clienteId,
        rua: req.body.rua,
        numero: req.body.numero,
        cep: req.body.cep,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        tipo: req.body.tipo,
        estado: req.body.estado
    };

    try {
        // Cadastra o endereço.
        const enderecoCad = await Endereco.cadastrarEndereco(dados.clienteId, dados.rua, dados.numero, dados.cep, dados.bairro, dados.cidade, dados.tipo, dados.estado); 
        if (enderecoCad.result.rowsAffected[0] > 0 && enderecoCad.metodo === 'atualizacao') {
            // Retorna uma resposta de sucesso se o endereço foi cadastrado com sucesso.
            res.status(200).json({ resposta: 'Endereço atualizado com sucesso!.', status: 200, metodo: 'atualizacao' });
        } else if (enderecoCad.result.rowsAffected[0] > 0 && enderecoCad.metodo === 'cadastro') {
            // Retorna uma resposta de sucesso se o endereço foi cadastrado com sucesso.
            res.status(200).json({ resposta: 'Endereço cadastrado com sucesso.', status: 200, metodo: 'cadastro' });
        }
    } catch (error) {
        // Retorna um erro de servidor se ocorrer uma exceção.
        res.status(500).json({ erro: error, message: 'Ops, ocorreu um erro ao se conectar com o servidor!', status: 500 });
    }
})

// Rota para buscar um endereço.
enderecoController.get('/buscarEndereco/:clienteId', async function (req, res) {
    // Extrai o ID do cliente da URL.
    const clienteId = req.params.clienteId;

    try {
        // Busca o endereço.
        const endereco = await Endereco.buscarEndereco(clienteId);
        if (endereco.endereco.rowsAffected[0] > 0) {
            const dadosEndereco = endereco.endereco.recordset[0];
            // Retorna o endereço.
            res.status(200).json({ dadosEndereco , status: 200 });
        } else {
            // Retorna uma resposta de erro se o endereço não foi encontrado.
            res.json({ message: 'Endereço não encontrado.', status: 404 });
        }
    } catch (error) {
        // Retorna um erro de servidor se ocorrer uma exceção.
        res.status(500).json({ erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 });
    }
})

// Rota para deletar um endereço.
enderecoController.delete('/deletarEndereco/:clienteId', async function (req, res) {
    // Extrai o ID do cliente da URL.
    const clienteId = req.params.clienteId;

    try {
        // Deleta o endereço.
        const endereco = await Endereco.deletarEndereco(clienteId);
        if (endereco.endereco.rowsAffected[0] > 0) {
            // Retorna o endereço deletado.
            res.status(200).json({ endereco, status: 200 });
        } else {
            // Retorna uma resposta de erro se o endereço não foi encontrado.
            res.json({message: 'Ops, falha ao se conectar com o servidor.', status: 500 });
        }
    } catch (error) {
        // Retorna um erro de servidor se ocorrer uma exceção.
        res.status(500).json({ erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 });
    }
})

module.exports = enderecoController;
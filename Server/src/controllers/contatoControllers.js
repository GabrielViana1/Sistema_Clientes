// Importando o módulo Express.
const express = require("express");

// Criando um roteador do Express para o controle de clientes.
const contatoControllers = express.Router();

const Contatos = require('../db_querys/contatos');

// Rota para cadastrar um novo contato.
contatoControllers.post('/cadContato', async function (req, res) {
    // Extrai os dados do corpo da requisição.
    const dados = {
        clienteId: req.body.clienteId,
        ddd: req.body.ddd,
        numero: req.body.numero,
        tipo: req.body.tipo,
    };

    try {
        // Cadastra o contato.
        const contatoCad = await Contatos.cadastrarContato(dados.clienteId, dados.ddd, dados.numero, dados.tipo);
        if (contatoCad.result.rowsAffected[0] > 0 && contatoCad.metodo === 'atualizacao') {
            // Retorna uma resposta de sucesso se o contato foi cadastrado com sucesso.
            res.status(200).json({ resposta: 'Contato atualizado com sucesso!.', status: 200, metodo: 'atualizacao' });
        } else if (contatoCad.result.rowsAffected[0] > 0 && contatoCad.metodo === 'cadastro') {
            // Retorna uma resposta de sucesso se o contato foi cadastrado com sucesso.
            res.status(200).json({ resposta: 'Contato cadastrado com sucesso.', status: 200, metodo: 'cadastro' });
        }
    } catch (error) {
        // Retorna um erro de servidor se ocorrer uma exceção.
        console.log(error)
        res.status(500).json({ erro: error, message: 'Ops, ocorreu um erro ao se conectar com o servidor!', status: 500 });
    }
})


// Rota para buscar um contato.
contatoControllers.get('/buscarContato/:clienteId', async function (req, res) {
    // Extrai o ID do cliente da URL.
    const clienteId = req.params.clienteId;

    try {
        // Busca o contato.
        const contato = await Contatos.buscarContato(clienteId);
        if (contato.contato.rowsAffected[0] > 0) {
            const dadosContato = contato.contato.recordset[0];
            // Retorna o contato.
            res.status(200).json({ dadosContato, status: 200 });
        } else {
            // Retorna uma resposta de erro se o contato não foi encontrado.
            res.json({ message: 'Contato não encontrado.', status: 404 });
        }
    } catch (error) {
        // Retorna um erro de servidor se ocorrer uma exceção.
        res.status(500).json({ erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 });
    }
})


// Rota para deletar um contato.
contatoControllers.delete('/deletarContato/:clienteId', async function (req, res) {
    // Extrai o ID do cliente da URL.
    const clienteId = req.params.clienteId;

    try {
        // Deleta o contato.
        const contato = await Contatos.deletarContato(clienteId);
        if (contato.contato.rowsAffected[0] > 0) {
            // Retorna o contato deletado.
            res.status(200).json({ contato, status: 200 });
        } else {
            // Retorna uma resposta de erro se o contato não foi deletado.
            res.json({ message: 'Contato não deletado.', status: 404 });
        }
    } catch (error) {
        // Retorna um erro de servidor se ocorrer uma exceção.
        res.status(500).json({ erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 });
    }
})

module.exports = contatoControllers


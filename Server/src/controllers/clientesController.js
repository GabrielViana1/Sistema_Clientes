// Importando o módulo Express.
const express = require("express");

// Criando um roteador do Express para o controle de clientes.
const clientesController = express.Router();

// Importando a classe Cliente que manipula operações no banco de dados relacionadas a clientes.
const Cliente = require('../db_querys/cliente');
const ConsultaDoc = require("../db_querys/consultaDoc");

/**
 * Rota para cadastrar um novo cliente.
 * Método: POST
 * Rota: /cadCliente
 */
clientesController.post('/cadCliente', async function (req, res) {
    // Extrai os dados do corpo da requisição.

    const dados = {
        id: req.body.id,
        nome: req.body.dados.nome,
        cpf: req.body.dados.cpf,
        cnpj: req.body.dados.cnpj,
        tipo: req.body.dados.tipo
    };

    try {
        // Verifica se o CPF está vazio.
        if (dados.cnpj === '') {
            // Verifica se o CPF já existe no sistema.
            const verificarCpfExiste = await ConsultaDoc.consultarCpfExiste(dados.cpf);
            if (verificarCpfExiste) {
                // Retorna um erro de conflito se o CPF já existir no sistema.
                res.status(409).json({ resposta: 'Esse CPF já existe no sistema.', status: 409 });
            } else {
                // Caso o CPF não exista, cadastra o cliente.
                const clientecad = await Cliente.cadastrarCliente(dados.nome, dados.cpf, dados.cnpj, dados.tipo);
                if (clientecad.rowsAffected[0] > 0) {
                    // Retorna uma resposta de sucesso se o cliente foi cadastrado com sucesso.
                    res.status(200).json({ resposta: 'Cliente cadastrado com sucesso.', status: 200 });
                }
            }
        }
        // Verifica se o CNPJ está vazio.
        else if (dados.cpf === '') {
            // Verifica se o CNPJ já existe no sistema.
            const verificarCnpjExiste = await ConsultaDoc.consultarCnpjExiste(dados.cnpj);
            if (verificarCnpjExiste) {
                // Retorna um erro de conflito se o CNPJ já existir no sistema.
                res.status(409).json({ resposta: 'Esse CNPJ já existe no sistema.', status: 409 });
            } else {
                // Caso o CNPJ não exista, cadastra o cliente.
                const clientecad = await Cliente.cadastrarCliente(dados.nome, dados.cpf, dados.cnpj, dados.tipo);
                if (clientecad.rowsAffected[0] > 0) {
                    // Retorna uma resposta de sucesso se o cliente foi cadastrado com sucesso.
                    res.status(200).json({ resposta: 'Cliente cadastrado com sucesso.', status: 200 });
                }
            }
        } else {
            // Se nem o CPF nem o CNPJ estiverem vazios, retorna um erro genérico.
            res.json({ erro: 'Ocorreu um erro inesperado, tente novamente!' });
        }
    } catch (error) {
        // Retorna um erro caso ocorra uma exceção.
        res.json({ erro: error });
    }
});

//listar todos clientes
clientesController.get('/listarClientes', async function (req, res) {
    try {
        const clientes = await Cliente.listarClientes()
        if(clientes.status === 200) {
            res.json({ clientes })
        } else if(clientes.status === 404) {
            res.json({message: 'Nenhuma empresa cadastrada.', status: 404})
        } else {
            res.json({message: 'Ocorreu um erro inesperado.', status: 500 })
        } 
    } catch (error) {
        res.json({erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500})
    }
})

//Buscar cliente unico
clientesController.get('/buscarCliente/:numDoc', async function (req, res) {
    const numDoc = req.params.numDoc
    const numDocString = numDoc.toString()
    try {
        const cliente = await Cliente.buscarCliente(numDoc, numDocString)
        if (cliente.ID) {
            res.json({ cliente, status: 200, })
        } else if (cliente === 'Cliente não encontrado.') {
            res.json({ message: 'Cliente não encontrado.', status: 404 })
        } else {
            res.json({ message: 'Ocorreu um erro inesperado.', status: 500 })
        }
    } catch (error) {
        res.json({ erro: error, status: 500, message: 'Ops, falha ao se conectar com o servidor.' })
    }
})

//Buscar cliente unico
clientesController.get('/buscarClienteEdit/:idCliente', async function (req, res) {
    const idCliente = req.params.idCliente
    try {
        const cliente = await Cliente.buscarClienteEdit(idCliente)
        if (cliente.ID) {
            res.json({ cliente, status: 200, })
        } else if (cliente === 'Cliente não encontrado.') {
            res.json({ message: 'Cliente não encontrado.', status: 404 })
        } else {
            res.json({ message: 'Ocorreu um erro inesperado.', status: 500 })
        }
    } catch (error) {
        res.json({ erro: error, status: 500, message: 'Ops, falha ao se conectar com o servidor.' })
    }
})

//Salvar edição de dados cliente
clientesController.post('/editarCadCliente', async function (req, res) {
    // Extrai os dados do corpo da requisição.

    const dados = {
        id: req.body.dados.id,
        nome: req.body.dados.nome,
        cpf: req.body.dados.cpf,
        cnpj: req.body.dados.cnpj
    };

    // Cria uma nova instância da classe Cliente com os dados fornecidos.
    const cliente = new Cliente(dados.id, dados.nome, dados.cpf, dados.cnpj);
    const consultaDoc = new ConsultaDoc(dados.id, dados.nome, dados.cpf, dados.cnpj)

    try {
        // Verifica se o CPF está vazio.
        if (dados.cnpj === '') {
            // Verifica se o CPF já existe no sistema.
            const verificarCpfExiste = await consultaDoc.consultarCpfExisteEditar();
            if (verificarCpfExiste) {
                // Retorna um erro de conflito se o CPF já existir no sistema.
                res.status(409).json({ resposta: 'Esse CPF já existe no sistema.', status: 409 });
            } else {
                // Caso o CPF não exista, cadastra o cliente.
                const clienteCad = await cliente.editarCliente();
                if (clienteCad.rowsAffected[0] > 0) {
                    // Retorna uma resposta de sucesso se o cliente foi cadastrado com sucesso.
                    res.status(200).json({ resposta: 'Alterações realizadas com sucesso.', status: 200 });
                }
            }
        }
        // Verifica se o cpf está vazio.
        else if (dados.cpf === '') {
            // Verifica se o CNPJ já existe no sistema.
            const verificarCnpjExiste = await consultaDoc.consultarCnpjExisteEditar();
            if (verificarCnpjExiste) {
                // Retorna um erro de conflito se o CNPJ já existir no sistema.
                res.status(409).json({ resposta: 'Esse CNPJ já existe no sistema.', status: 409 });
            } else {
                // Caso o CNPJ não exista, cadastra o cliente.
                const clienteCad = await cliente.editarCliente();
                if (clienteCad.rowsAffected[0] > 0) {
                    // Retorna uma resposta de sucesso se o cliente foi cadastrado com sucesso.
                    res.status(200).json({ resposta: 'Alterações realizadas com sucesso.', status: 200 });
                }
            }
        } else {
            // Se nem o CPF nem o CNPJ estiverem vazios, retorna um erro genérico.
            res.json({ erro: 'Ocorreu um erro inesperado, tente novamente!', resposta: 'Ocorreu um erro inesperado, tente novamente!' });
        }
    } catch (error) {
        // Retorna um erro caso ocorra uma exceção.
        res.json({ erro: error });
    }
});

// Excluir cliente
clientesController.delete('/excluirCliente', async (req, res) => {
    //Extrai os dados do corpo da requisição.
    const id = req.body.dados.idCliente;
    try {
        const excluirCliente = await Cliente.excluirCliente(id);
        if (excluirCliente.status === 200) {
            res.json({ message: 'Cliente excluído com sucesso.', status: 200 });
        } else if (excluirCliente.status === 500 && excluirCliente.message === 'Ocorreu um erro inesperado') {
            res.json({ message: 'Ocorreu um erro inesperado.', status: 500 });
        } else {
            throw new Error('Ops, falha ao se conectar com o servidor.');
        }
    } catch (error) {
        res.json({ erro: error.message, message: 'Ops, falha ao se conectar com o servidor.', status: 500 });
    }
});


// Exporta o roteador do Express para ser utilizado em outros módulos.
module.exports = clientesController;




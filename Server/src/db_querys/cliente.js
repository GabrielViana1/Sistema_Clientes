// Importando o módulo de conexão com o banco de dados.
const db = require('../database/dbConnection');

// Definição da classe Cliente.
class Cliente {

    // Construtor da classe Cliente, recebe Nome, cpf e cnpj como parâmetros.
    constructor(id, nome, cpf, cnpj, tipo) {
        this.id = id
        this.nome = nome; // Atributo Nome do cliente.
        this.cnpj = cnpj.replace(/[^\d]/g, "") // Atributo CNPJ do cliente, sem caracteres não numéricos.
        this.cpf = cpf.replace(/[^\d]/g, "") // Atributo CPF do cliente, sem caracteres não numéricos.
        this.tipo = tipo // Atributo tipo do cliente.
    }

    // Método para cadastrar um novo cliente na base de dados.
    static async cadastrarCliente(nome, cpf, cnpj, tipo) {
        try {
            const result = await db.query(`
                INSERT INTO clientes (Nome, cpf, cnpj, tipo)
                VALUES ('${nome}', '${cpf}', '${cnpj}', '${tipo}')
            `);
            return result; // Retorna o resultado do cadastro.
        } catch (error) {
            return error; // Retorna o erro caso ocorra uma exceção.
        }
    }

    // Método para cadastrar um novo cliente na base de dados.
    async editarCliente() {
        try {
            const result = await db.query(`
            UPDATE CLIENTES 
            SET Nome = '${this.nome}', 
            cpf = '${this.cpf}', 
            cnpj = '${this.cnpj}' 
            WHERE ID = ${this.id};
            `);
            
            return result; // Retorna o resultado do cadastro.
        } catch (error) {
            return error; // Retorna o erro caso ocorra uma exceção.
        }
    }

    static async excluirCliente(idCliente) {
        try {
            await db.query(`DELETE FROM ENDERECOS WHERE Cliente_ID = '${idCliente}' `);
            await db.query(`DELETE FROM CONTATOS WHERE Cliente_ID = '${idCliente}' `);   
            const resultCliente = await db.query(`
                DELETE FROM CLIENTES WHERE ID = '${idCliente}'
            `);
            if (resultCliente.rowsAffected[0] > 0) {
                return { message: 'Sucesso', status: 200 };
            } else {
                return { message: 'Ocorreu um erro inesperado', status: 500 };
            }
        } catch (error) {
            return { message: 'Falha ao se conectar com o servidor', status: 500 };
        }
    }
    //listar todos clientes
    static async listarClientes() {
        try {
            const result = await db.query(`
                SELECT * FROM CLIENTES
            `);
            if (result.rowsAffected[0] > 0) {
                return { result, status: 200 }; // Retorna o resultado da consulta.
            } else {
                return { message: 'Nenhuma empresa cadastrada.', status: 404 }
            }
        } catch (error) {
            return { erro: error, message: 'Ops, falha ao se conectar com o servidor.' }; // Retorna o erro caso ocorra uma exceção.
        }
    }

    //buscar cliente unico
    static async buscarCliente(numDoc, numDocString) {
        try {
            if (numDocString.length === 11) {
                const result = await db.query(`
                SELECT * FROM CLIENTES WHERE CPF = '${numDoc}'
                `);
                if (result.rowsAffected[0] > 0) {
                    return result.recordset[0]; // Retorna o resultado da consulta.
                } else {
                    return 'Cliente não encontrado.'
                }
            } else if (numDocString.length === 14) {
                const result = await db.query(`
                SELECT * FROM CLIENTES WHERE CNPJ = '${numDoc}'
                `);
                if (result.rowsAffected[0] > 0) {
                    return result.recordset[0]; // Retorna o resultado da consulta.
                } else {
                    return 'Cliente não encontrado.'
                }
            } else {
                return 'Cliente não encontrado.'
            }
        } catch (error) {
            return error; // Retorna o erro caso ocorra uma exceção.
        }
    }

    //buscar cliente unico
    static async buscarClienteEdit(idCliente) {
        try {
            const result = await db.query(`
                SELECT * FROM CLIENTES WHERE ID = '${idCliente}'
                `);
            if (result.rowsAffected[0] > 0) {
                return result.recordset[0]; // Retorna o resultado da consulta.
            } else {
                return 'Cliente não encontrado.'
            }
        } catch (error) {
            return error; // Retorna o erro caso ocorra uma exceção.
        }
    }
}

// Exporta a classe Cliente para ser utilizada em outros módulos.
module.exports = Cliente;

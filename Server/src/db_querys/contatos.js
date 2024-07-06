const db = require('../database/dbConnection');

class Contato {
    constructor() { }

    // Método para cadastrar um novo contato na base de dados.
    static async cadastrarContato(clienteId, ddd, telefone, tipo) {
        try {
            const contatoCadastrado = await db.query(`SELECT * FROM CONTATOS WHERE Cliente_ID = ${clienteId}`);
            if (contatoCadastrado.rowsAffected[0] > 0) {
                //Atualiza o contato do cliente
                const result = await db.query(`
                    UPDATE CONTATOS
                    SET DDD = ${ddd}, Numero = '${telefone}', Tipo = '${tipo}'
                    WHERE Cliente_ID = ${clienteId}
                `);
                return { result, metodo: 'atualizacao' }; // Retorna o resultado da atualização.
            } else {
                const result = await db.query(`
                    INSERT INTO CONTATOS (Cliente_ID, DDD, Numero, Tipo)
                    VALUES ('${clienteId}',  ${ddd}, '${telefone}', '${tipo}')
                `);
                return { result, metodo: 'cadastro' }; // Retorna o resultado do cadastro.
            }
        } catch (error) {
            return { erro: error, message: 'Ops, ocorreu um erro ao se conectar com o servidor!' } // Retorna o erro caso ocorra uma exceção.
        }
    }

    // Método para buscar um contato na base de dados.
    static async buscarContato(clienteId) {
        try {
            const contato = await db.query(`SELECT * FROM CONTATOS WHERE Cliente_ID = ${clienteId}`);
            return { contato, status: 200 } // Retorna o contato.
        } catch (error) {
            return { erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 } // Retorna o erro caso ocorra uma exceção.
        }
    }

    // Método para deletar um contato na base de dados.
    static async deletarContato(clienteId) {
        try {
            const contato = await db.query(`DELETE FROM CONTATOS WHERE Cliente_ID = ${clienteId}`);
            if (contato.rowsAffected[0] > 0) {
                return { contato, status: 200 } // Retorna o contato deletado.
            } else {
                return { message: 'Ops, falha ao se conectar com o servidor.', status: 500 }
            }
            return { contato, status }
        } catch (error) {
            return { erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 } // Retorna o erro caso ocorra uma exceção.
        }
    }
}

module.exports = Contato;
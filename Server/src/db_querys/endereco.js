const db = require('../database/dbConnection');

class Endereco {
    constructor() {}

    // Método para cadastrar um novo endereço na base de dados.
    static async cadastrarEndereco(clienteId, rua, numero, cep, bairro, cidade, tipo, estado) {
        try {
            const enderecoCadastrado = await db.query(`SELECT * FROM ENDERECOS WHERE Cliente_ID = ${clienteId}`);
            if (enderecoCadastrado.rowsAffected[0] > 0) {
               //Atualiza o endereço do cliente
               cep = cep.replace(/[^0-9]/g, '');
                const result = await db.query(`
                    UPDATE ENDERECOS     
                    SET Rua = '${rua}',
                    Numero = ${numero},
                    CEP = '${cep}',
                    Bairro = '${bairro}',
                    Cidade = '${cidade}',
                    Tipo = '${tipo}',
                    Estado = '${estado}'
                    WHERE Cliente_ID = ${clienteId};
                `);
                return {result,  metodo: 'atualizacao'}; // Retorna o resultado da atualização.
            } else {
                const result = await db.query(`
                    INSERT INTO ENDERECOS (Cliente_ID, Rua, Numero, CEP, Bairro, Cidade, Tipo, Estado)
                    VALUES ('${clienteId}', '${rua}', ${numero}, '${cep}', '${bairro}', '${cidade}', '${tipo}', '${estado}')
                `);
                return {result, metodo: 'cadastro' } ; // Retorna o resultado do cadastro.
            }
        } catch (error) {
            return {erro: error, message: 'Ops, ocorreu um erro ao se conectar com o servidor!'} // Retorna o erro caso ocorra uma exceção.
        }
    }

    // Método para buscar um endereço na base de dados.
    static async buscarEndereco(clienteId) {
        try {
            const endereco = await db.query(`SELECT * FROM ENDERECOS WHERE Cliente_ID = ${clienteId}`);
            return {endereco, status: 200 } // Retorna o endereço.
        } catch (error) {
            return { erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 } // Retorna o erro caso ocorra uma exceção.
        }
    }

    // Método para deletar um endereço na base de dados.
    static async deletarEndereco(clienteId) {
        try {
            const endereco = await db.query(`DELETE FROM ENDERECOS WHERE Cliente_ID = ${clienteId}`);
            if (endereco.rowsAffected[0] > 0) {
                return {endereco, status: 200 } // Retorna o endereço deletado.
            } else {
                return {message: 'Ops, falha ao se conectar com o servidor.', status: 500 }
            }
            return {endereco, status: 200 } // Retorna o endereço deletado.
        } catch (error) {
            return { erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 } // Retorna o erro caso ocorra uma exceção.
        }
    }
}


module.exports = Endereco; // Exporta a classe Endereco.
// Importando o módulo de conexão com o banco de dados.
const db = require('../database/dbConnection');

class ConsultaDoc {
    // Construtor da classe Cliente, recebe Nome, cpf e cnpj como parâmetros.
    constructor(id, nome, cpf, cnpj) {
        this.id = id;
        this.nome = nome; // Atributo Nome do cliente.
        this.cnpj = cnpj.replace(/[^\d]/g, ""); // Atributo CNPJ do cliente, sem caracteres não numéricos.
        this.cpf = cpf.replace(/[^\d]/g, ""); // Atributo CPF do cliente, sem caracteres não numéricos.
    }

    // Método para consultar se o CPF já existe na base de dados.
    static async consultarCpfExiste(cpf) {
        try {
            const cpfExiste = await db.query(`SELECT * FROM clientes WHERE cpf = '${cpf}'`);
            if (cpfExiste.rowsAffected[0] > 0) {
                return true; // Retorna verdadeiro se o CPF já existe na base de dados.
            } else {
                return false; // Retorna falso se o CPF não existe na base de dados.
            }
        } catch (error) {
            console.error('Erro ao consultar o cpf:', error.message); // Log de erro caso ocorra uma exceção.
            return error
        }
    }

    // Método para consultar se o CNPJ já existe na base de dados.
    static async consultarCnpjExiste(cnpj) {
        try {
            const cnpjExiste = await db.query(`SELECT * FROM clientes WHERE cnpj = '${cnpj}'`);
            if (cnpjExiste.rowsAffected[0] > 0) {
                return true; // Retorna verdadeiro se o CNPJ já existe na base de dados.
            } else {
                return false; // Retorna falso se o CNPJ não existe na base de dados.
            }
        } catch (error) {
            console.error('Erro ao consultar o cnpj:', error.message); // Log de erro caso ocorra uma exceção.
            return error
        }
    }

    // Método para consultar se o CPF já existe na base de dados.
    async consultarCpfExisteEditar() {
        try {
            const cpfExiste = await db.query(`SELECT * FROM clientes WHERE cpf = '${this.cpf}' AND id != ${this.id};`);
            if (cpfExiste.rowsAffected[0] > 0) {
                return true; // Retorna verdadeiro se o CPF já existe na base de dados.
            } else {
                return false; // Retorna falso se o CPF não existe na base de dados.
            }
        } catch (error) {
            console.error('Erro ao consultar o cpf:', error.message); // Log de erro caso ocorra uma exceção.
            return error
        }
    }

    // Método para consultar se o CNPJ já existe na base de dados.
    async consultarCnpjExisteEditar() {
        try {
            const cnpjExiste = await db.query(`SELECT * FROM clientes WHERE cnpj = '${this.cnpj}' AND id != ${this.id};`);
            if (cnpjExiste.rowsAffected[0] > 0) {
                return true; // Retorna verdadeiro se o CNPJ já existe na base de dados.
            } else {
                return false; // Retorna falso se o CNPJ não existe na base de dados.
            }
        } catch (error) {
            console.error('Erro ao consultar o cnpj:', error.message); // Log de erro caso ocorra uma exceção.
            return error
        }
    }
}

module.exports =  ConsultaDoc
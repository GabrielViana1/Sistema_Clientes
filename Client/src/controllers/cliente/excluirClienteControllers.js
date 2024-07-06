import config from "../../config/rotas.js"

// Classe para excluir um cliente
class ExcluirCliente {
    constructor() { }

    static async excluirCliente(idCliente) {

        const dados = {
            idCliente,
        }

        try {
            const cliente = await fetch(`${config.excluirCliente}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({dados})
                }).then(async response => {
                return response.json()
            }).then(data => {
                return data
            })
            return cliente
        } catch (error) {
            return { erro: error, status: 500, message: 'Ops, falha ao se conectar com o servidor.' }
        }
    }
}

export default ExcluirCliente;
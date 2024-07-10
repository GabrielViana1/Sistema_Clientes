// Importando o objeto de configuração e a classe Popup para manipulação de popups.
import config from '../../config/rotas.js';
import Popup from '../../manipularForms/popup.js';

// Definindo a classe CadCliente para realizar o cadastro de clientes.
class CadCliente {
    constructor(Nome, CPF, CNPJ, tipo) {
        this.Nome = Nome,
        this.CPF = CPF,
        this.CNPJ = CNPJ
        this.tipo = tipo
    }

    // Método estático para cadastrar um cliente.
    static async cadastrarCliente(nome, cpf, cnpj, tipo) {
        
        // Obtendo referências aos elementos de popup.
        const popupClose = document.getElementById('btnClosePop');
        const msgPopup = document.getElementById('msgPopup');

        // Criando o objeto com os dados do cliente.
        const dados = {
            nome,
            cpf,
            cnpj,
            tipo,
        };

        // Enviando uma requisição para cadastrar o cliente.
        const cadCliente = await fetch(config.cadCliente, {
            method: 'POST',
            body: JSON.stringify({ dados }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            // Verifica se a resposta foi bem sucedida
            if (response.status === 200) {
                return response.json(); // Converte a resposta para JSON
            } else if (response.status === 409) {
                return response.json();
            }
            // Caso contrário, lança um erro com a mensagem recebida do servidor.
            const errorData = await response.json();
            throw new Error(errorData.erro);
        }).then(data => {
            return data;
        }).catch(async error => {
            console.log('Erro:', error.message);
            // Tratamento de erros
            if(error.message === 'Failed to fetch') {
                msgPopup.innerText = `Ops, falha ao se conectar com o servidor.`;
            } else {
                msgPopup.innerText = `Erro: ${error.message}`;
            }
            // Mostra o popup de erro
            await Popup.mostrarPopup();

            // Fecha o popup após 5 segundos
            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            // Adiciona um evento de clique para fechar o popup
            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
            return error;
        });

        return cadCliente;
    }
}

// Exporta a classe CadCliente para uso em outros módulos.
export default CadCliente;

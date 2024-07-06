import config from "../../config/rotas.js"
import Popup from '../../manipularForms/popup.js';
import VerificaDoc from "../../manipularForms/verificaDoc.js";
import ListarEditarExlcuirCliente from "../../pages/listarEditarExcluirClientes/listarEditarExcluir.js";
import BuscarCliente from "./buscarClienteControllers.js";
import ExcluirCliente from "./excluirClienteControllers.js";

// Classe para editar um cliente
class EditarCliente {
    constructor() { }

    // Método estático para cadastrar um cliente.
    static async editarCadCliente(id, nome, cpf, cnpj) {

        // Obtendo referências aos elementos de popup.
        const popupClose = document.getElementById('btnClosePop');
        const msgPopup = document.getElementById('msgPopup');

        // Criando o objeto com os dados do cliente.
        const dados = {
            id,
            nome,
            cpf,
            cnpj,
        };

        if (dados.cnpj === '') {
            const verificaCpf = await VerificaDoc.validarCpf(dados.cpf)
            if (verificaCpf) {
                // Enviando uma requisição para cadastrar o cliente.
                const editarCadCliente = await fetch(config.editarCadCliente, {
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
                    if (error.message === 'Failed to fetch') {
                        msgPopup.innerText = `Ops, falha ao se conectar com o servidor.`;
                    } else {
                        msgPopup.innerText = `Erro: ${error.message}`;
                    }
                    // Mostra o popup de erro
                    await Popup.mostrarPopup(nome, cpf);

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

                return editarCadCliente;
            } else {
                msgPopup.innerText = `CPF inválido!`;
                await Popup.mostrarPopup(nome, cpf);

                // Fecha o popup após 5 segundos
                setTimeout(async () => {
                    await Popup.fecharPopup();
                }, 5000);

                // Adiciona um evento de clique para fechar o popup
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
            }
        } else if (dados.cpf === '') {
            const verificaCNPJ = await VerificaDoc.validarCnpj(dados.cnpj)
            if (verificaCNPJ) {
                // Enviando uma requisição para cadastrar o cliente.
                const editarCadCliente = await fetch(config.editarCadCliente, {
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
                    if (error.message === 'Failed to fetch') {
                        msgPopup.innerText = `Ops, falha ao se conectar com o servidor.`;
                    } else {
                        msgPopup.innerText = `Erro: ${error.message}`;
                    }
                    // Mostra o popup de erro
                    await Popup.mostrarPopup(nome, cpf);

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

                return editarCadCliente;
            } else {
                msgPopup.innerText = `CNPJ inválido!`;
                await Popup.mostrarPopup(nome, cpf);

                // Fecha o popup após 5 segundos
                setTimeout(async () => {
                    await Popup.fecharPopup();
                }, 5000);

                // Adiciona um evento de clique para fechar o popup
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
            }
        }
    }

    // Função para manipular o evento de edição do cliente
    static async EditClient(e) {
        e.preventDefault();
        const cliente = await this.addInfosModal(e.target.id);
        const inputNome = document.getElementById('clienteNome');
        const inputDoc = document.getElementById('clienteDoc');
        const labelDoc = document.getElementById('labelClienteDoc');
        let salvarAlteracaoBtn = document.getElementById('salvarAlteracao');
        let btnExcluir = document.getElementById('excluirCliente')
        const msgPopup = document.getElementById('msgPopup');
        const popupClose = document.getElementById('btnClosePop');

        if (cliente.cliente.CNPJ === '') {
            Inputmask("999.999.999-99").mask(inputDoc);
            labelDoc.innerText = 'CPF';
            inputNome.value = cliente.cliente.Nome;
            inputDoc.value = cliente.cliente.CPF;
        } else {
            Inputmask("99.999.999/9999-99").mask(inputDoc);
            labelDoc.innerText = 'CNPJ';
            inputNome.value = cliente.cliente.Nome;
            inputDoc.value = cliente.cliente.CNPJ;
        }

        const executarAlteracao = async () => {
            const doc = inputDoc.value;
            const nome = inputNome.value;

            let editarCliente 

            if(inputDoc.value === '' && inputNome.value === '') {
                msgPopup.innerText = 'Preencha os campos vazios!';
                inputDoc.classList = 'form-control border border-danger';
                inputNome.classList = 'form-control border border-danger';

                await Popup.mostrarPopup();
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
            } else if (inputDoc.value === '') {
                msgPopup.innerText = 'Preencha o campo vazio!';
                inputDoc.classList = 'form-control border border-danger';
                inputNome.classList = 'form-control';

                await Popup.mostrarPopup();
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
            } else if (inputNome.value === '') {
                msgPopup.innerText = 'Preencha o campo vazio!';
                inputDoc.classList = 'form-control';
                inputNome.classList = 'form-control border border-danger';
                
                await Popup.mostrarPopup();
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
            } else {
                inputDoc.classList = 'form-control';
                inputNome.classList = 'form-control';
                
                if (doc.length === 14) {
                    editarCliente = await this.editarCadCliente(cliente.cliente.ID, nome, doc, cliente.cliente.CNPJ);
                } else if (doc.length === 18) {
                    editarCliente = await this.editarCadCliente(cliente.cliente.ID, nome, cliente.cliente.CPF, doc);
                }
    
                if (editarCliente?.status === 200) {
                    msgPopup.innerText = editarCliente.resposta;
                    await Popup.mostrarPopup();
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                } else if (editarCliente?.status === 409) {
                    msgPopup.innerText = editarCliente.resposta;
                    await Popup.mostrarPopup();
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                }
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
    
                return editarCliente
            }
        };

        // Remover event listener anterior antes de adicionar um novo
        const novoSalvarAlteracaoBtn = salvarAlteracaoBtn.cloneNode(true);
        salvarAlteracaoBtn.parentNode.replaceChild(novoSalvarAlteracaoBtn, salvarAlteracaoBtn);
        salvarAlteracaoBtn = novoSalvarAlteracaoBtn;
        salvarAlteracaoBtn.addEventListener('click', executarAlteracao);

        document.getElementById('closeEditCliente').addEventListener('click', async () => {
            salvarAlteracaoBtn.removeEventListener('click', executarAlteracao); // Remover listener após execução
            btnExcluir.removeEventListener('click', excluirCliente)
            const inputDocLimpo = inputDoc.value.replace(/[^\d]/g, "")
            const buscarCliente = await BuscarCliente.BuscarCliente(inputDocLimpo)
            if (buscarCliente.status === 200) {
                const inputBuscar = document.getElementById('inputDoc');
                inputBuscar.value = inputDocLimpo
                ListarEditarExlcuirCliente.buscarCliente()
            }
        })

        // Função para excluir um cliente  
        const excluirCliente = async () => {
            const excluirCliente = await ExcluirCliente.excluirCliente(e.target.id)
            if (excluirCliente.status === 200) {
                //Fecha o modal ao excluir o cliente
                var myModalEl = document.getElementById('staticBackdrop');
                var modal = bootstrap.Modal.getInstance(myModalEl); // Obtém a instância do modal
                await modal.hide();
                await ListarEditarExlcuirCliente.listarClientes()
                msgPopup.innerText = excluirCliente.message;
                Popup.mostrarPopup()
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000)
            } else if (excluirCliente.status === 500) {
                msgPopup.innerText = excluirCliente.message;
                Popup.mostrarPopup()
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000)
            }
        }

        btnExcluir.addEventListener('click', excluirCliente)
    }

    // Método para adicionar informações ao modal
    static async addInfosModal(idCliente) {
        try {
            const cliente = await fetch(`${config.buscarClienteEdit}${idCliente}`).then(async response => {
                return response.json()
            }).then(data => {
                return data
            })
            return cliente
        } catch (error) {
            return { erro: error, status: 500, message: 'Ops, falha ao se conectar com o servidor.' }
        }
    }

    // Método para abrir o modal
    static async openModal() {
        var modalElement = document.getElementById('staticBackdrop');
        var modal = new Modal(modalElement)
        modal.show()
    }
}

export default EditarCliente
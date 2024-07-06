import config from "../../config/rotas.js"
import Popup from '../../manipularForms/popup.js'
import DeletarEndereco from './deletarEnderecoControllers.js'
import EditarCliente from "../cliente/editarClienteControllers.js"

//Classe para salvar ou editar um endereço
class SalvarEditarEndereco {
    constructor() { }

    // Método para salvar um endereço ou editar 
    static async salvarEditarEndereco(e) {
        const endereco = await this.buscarEndereco(e.target.id)
        const rua = document.getElementById('rua')
        const numero = document.getElementById('numero')
        const cep = document.getElementById('cep')
        const bairro = document.getElementById('bairro')
        const cidade = document.getElementById('cidade')
        const tipo = document.getElementById('tipo')
        const estado = document.getElementById('estado')
        const btnSalvar = document.getElementById('salvarEndereco')
        const msgPopup = document.getElementById('msgPopup')
        const popupClose = document.getElementById('btnClosePop')
        const deletarEnderecoBtn = document.getElementById('deletarEndereco')
        Inputmask("99999-999").mask(cep);


        try {
            const cliente = await EditarCliente.addInfosModal(e.target.id) //Buscar cliente
            if (cliente && cliente.cliente.CNPJ === '') {
                tipo.value = 'residencial'
            } else if (cliente && cliente.cliente.CPF === '') {
                tipo.value = 'comercial'
            }
        } catch (error) {
            msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
            await Popup.mostrarPopup();
            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
            setTimeout(async () => {
                await Popup.fecharPopup()
            }, 3000);
        }

        if (endereco.status === 200) {
            rua.value = endereco.dadosEndereco.Rua
            numero.value = endereco.dadosEndereco.Numero
            cep.value = endereco.dadosEndereco.CEP
            bairro.value = endereco.dadosEndereco.Bairro
            cidade.value = endereco.dadosEndereco.Cidade
            tipo.value = endereco.dadosEndereco.Tipo
            estado.value = endereco.dadosEndereco.Estado
        }

        const salvarEndereco = async () => {
            const dados = {
                clienteId: e.target.id,
                rua: rua.value,
                numero: numero.value,
                cep: (cep.value).replace(/[^\d]/g, ""),
                bairro: bairro.value,
                cidade: cidade.value,
                tipo: tipo.value,
                estado: estado.value
            }


            if (dados.rua === '' || dados.numero === '' || dados.cep === '' || dados.bairro === '' || dados.cidade === ''
                || dados.tipo === '' || dados.estado === ''
            ) {
                msgPopup.innerText = 'Preencha todos os campos!';
                await Popup.mostrarPopup();
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                return
            } else if (dados.cep.length < 8) {
                msgPopup.innerText = 'CEP inválido!';
                await Popup.mostrarPopup();
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                return
            }

            //Salvar endereço
            await fetch(config.cadEndereco, {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async response => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 500) {
                    return response.json()
                }
            }).then(async data => {
                if (data.status === 200 && data.metodo === 'cadastro') {
                    msgPopup.innerText = 'Endereço cadastrado com sucesso!';

                    await Popup.mostrarPopup();
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                } else if (data.status === 200 && data.metodo === 'atualizacao') {
                    msgPopup.innerText = 'Endereço atualizado com sucesso!';

                    await Popup.mostrarPopup();
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                } else if (data.status === 500) {
                    msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                    await Popup.mostrarPopup();
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                }

            }).catch(async error => {
                msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                await Popup.mostrarPopup();
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
            })


        }

        //Deletar endereço
        const deletarEndereco = async () => {
                const deletarEndereco = await DeletarEndereco.deletarEndereco(e)
                const cliente = await EditarCliente.addInfosModal(e.target.id)
                if (deletarEndereco.status === 200) {
                    rua.value = ''
                    numero.value = ''
                    cep.value = ''
                    bairro.value = ''
                    cidade.value = ''
                    estado.value = 'AC'
                    if (cliente && cliente.cliente.CNPJ === '') {
                        tipo.value = 'residencial'
                    } else if (cliente && cliente.cliente.CPF === '') {
                        tipo.value = 'comercial'
                    }
                }
        }

        btnSalvar.addEventListener('click', salvarEndereco)
        deletarEnderecoBtn.addEventListener('click', deletarEndereco)


        document.getElementById('closeEndereco').addEventListener('click', (e) => {
            e.preventDefault()
            btnSalvar.removeEventListener('click', salvarEndereco)
            deletarEnderecoBtn.removeEventListener('click', deletarEndereco)
            rua.value = ''
            numero.value = ''
            cep.value = ''
            bairro.value = ''
            cidade.value = ''
            tipo.value = 'residencial'
            estado.value = 'AC'
        })
    }

    //Buscar endereço com metodo get
    static async buscarEndereco(clienteId) {
        try {
            const endereco = await fetch(`${config.buscarEndereco}${clienteId}`).then(async response => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 500) {
                    return response.json()
                } else if (response.status === 404) {
                    return response.json()
                }
            }).then(data => {
                return data
            })
            return endereco
        } catch (error) {
            return { erro: error, message: 'Ops, falha ao se conectar com o servidor.', status: 500 }
        }

    }
}

export default SalvarEditarEndereco;
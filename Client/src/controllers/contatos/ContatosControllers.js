import config from "../../config/rotas.js"
import Popup from '../../manipularForms/popup.js'

//Classe para salvar e editar contatos
class SalvarEditarContato {
    constructor() { }

    // Método para salvar um contato ou editar 
    static async salvarEditarContato(e) {
        const contato = await this.buscarContato(e.target.id)
        const numero = document.getElementById('numeroTelefone')
        const ddd = document.getElementById('ddd')
        const tipo = document.getElementById('tipoContato')
        const msgPopup = document.getElementById('msgPopup')
        const popupClose = document.getElementById('btnClosePop')
        const btnDeletarContato = document.getElementById('deletarContato')
        const btnSalvarContato = document.getElementById('salvarContato')
        Inputmask("99999-9999").mask(numero);
        Inputmask("(99)").mask(ddd);

            if (contato.status === 200) {
                ddd.value = contato.dadosContato.DDD
                numero.value = contato.dadosContato.Numero
                tipo.value = contato.dadosContato.Tipo
            }
       
        //Salvar contato
        const salvarContato = async () => {
            const numero = document.getElementById('numeroTelefone')
            const ddd = document.getElementById('ddd')
            const tipo = document.getElementById('tipoContato')
            //Remover caracteres especiais
            const numeroFormatadO = numero.value = numero.value.replace(/[^\d]/g, "");
            const dddFormatado = ddd.value = ddd.value.replace(/[^\d]/g, "");

            const dados = {
                clienteId: e.target.id,
                ddd: dddFormatado,
                numero: numeroFormatadO,
                tipo: tipo.value,
            }

            if(dados.numero.length < 8 || dados.ddd.length < 2 || dados.tipo === '' ){
                msgPopup.innerText = 'Número ou DDD inválido.';
                await Popup.mostrarPopup();
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                return
            }

            try {
                const salvarContato = await fetch(config.cadContato, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                }).then(async response => {
                    return response.json()
                }).then(data => {
                    return data
                })

                if (salvarContato.status === 200 && salvarContato.metodo === 'cadastro') {
                    msgPopup.innerText = 'Contato salvo com sucesso.';
                    await Popup.mostrarPopup();
                    setTimeout(async () => {                
                        await Popup.fecharPopup()
                    }, 3000);
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                } else if (salvarContato.status === 200 && salvarContato.metodo === 'atualizacao') {
                    msgPopup.innerText = 'Contato atualizado com sucesso.';
                    await Popup.mostrarPopup();
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                } else if (salvarContato.status === 500) {
                    msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                    await Popup.mostrarPopup();
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                }
            }
            catch (error) {
                msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                await Popup.mostrarPopup();
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
            }
        } 

        //Deletar contato
        const deletarContato = async () => {
            const dados = {
                clienteId: e.target.id
            }

            const contato = await this.buscarContato(e.target.id)
            if (contato.status === 500) {
                msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                await Popup.mostrarPopup();
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
                return
            } else if (contato.status === 404) {
                msgPopup.innerText = 'Não há contato para deletar.';
                await Popup.mostrarPopup();
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                return
            }
            
            try {
                //Deletar contato com o metodo delete
                const deletarContato = await fetch(`${config.deletarContato}${dados.clienteId}`, {
                    method: 'DELETE'
                }).then(async response => {
                    return response.json()
                }).then(data => {
                    return data
                })

                if (deletarContato.status === 200) {
                    msgPopup.innerText = 'Contato deletado com sucesso.';
                    await Popup.mostrarPopup();
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                    ddd.value = ''
                    numero.value = ''
                } else if (deletarContato.status === 500) {
                    msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                    await Popup.mostrarPopup();
                    setTimeout(async () => {
                        await Popup.fecharPopup()
                    }, 3000);
                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                }
            } catch (error) {
                msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
                await Popup.mostrarPopup();
                setTimeout(async () => {
                    await Popup.fecharPopup()
                }, 3000);
                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
            }
        }

        //Salvar contato
        btnSalvarContato.addEventListener('click', salvarContato)
        btnDeletarContato.addEventListener('click', deletarContato)

        //Fechar modal de contato
        document.getElementById('btnCloseContato').addEventListener('click', function () {
            document.getElementById('numeroTelefone').value = ''
            document.getElementById('ddd').value = ''
            //remove event listener
            btnSalvarContato.removeEventListener('click', salvarContato)
            btnDeletarContato.removeEventListener('click', deletarContato)
        })

        
    }

    // Método para buscar um contato
    static async buscarContato(clienteId) {
        const msgPopup = document.getElementById('msgPopup')
        const popupClose = document.getElementById('btnClosePop')
        try {
            const contato = await fetch(`${config.buscarContato}${clienteId}`).then(async response => {
                return response.json()
            }).then(data => {
                return data
            })
            return contato
        } catch (error) {
            console.log(error)
            msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
            await Popup.mostrarPopup();
            setTimeout(async () => {
                await Popup.fecharPopup()
            }, 3000);
            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        }
    }

}

export default SalvarEditarContato;
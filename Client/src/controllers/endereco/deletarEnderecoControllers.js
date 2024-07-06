import config from "../../config/rotas.js"
import Popup from '../../manipularForms/popup.js'
import SalvarEditarEndereco from "./salvarEditarEndereco.js"

//Classe para deletar endereço
class DeletarEndereco {
    constructor() { }

    // Método para deletar um endereço
    static async deletarEndereco(e) {
        const clienteId = e.target.id
        const msgPopup = document.getElementById('msgPopup')
        const popupClose = document.getElementById('btnClosePop')
        try {
            //Verifica se o cliente possui endereço
            const buscarEndereco = await SalvarEditarEndereco.buscarEndereco(clienteId)
            if (buscarEndereco.status === 200) {
                const endereco = await fetch(`${config.deletarEndereco}${clienteId}`, {
                    method: 'DELETE'
                }).then(async response => {
                    return response.json()
                }).then(data => {
                    return data
                })
                if (endereco.status === 200) {
                    msgPopup.innerText = 'Endereço deletado com sucesso!'
                    await Popup.mostrarPopup()
                    popupClose.addEventListener('click', () => Popup.fecharPopup())
                    setTimeout(async () => await Popup.fecharPopup(), 3000)
                    return endereco
                } else if (endereco.status === 404) {
                    msgPopup.innerText = 'Não há endereço para deletar!'
                    await Popup.mostrarPopup()
                    popupClose.addEventListener('click', () => Popup.fecharPopup())
                    setTimeout(async () => await Popup.fecharPopup(), 3000)
                    return endereco
                } else if (endereco.status === 500) {
                    msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.'
                    await Popup.mostrarPopup()
                    popupClose.addEventListener('click', () => Popup.fecharPopup())
                    setTimeout(async () => await Popup.fecharPopup(), 3000)
                    return endereco
                }
            } else if (buscarEndereco.status === 404) {
                msgPopup.innerText = 'Não há endereço para deletar!'
                await Popup.mostrarPopup()
                popupClose.addEventListener('click', () => Popup.fecharPopup())
                setTimeout(async () => await Popup.fecharPopup(), 3000)
                return buscarEndereco
            } else if (buscarEndereco.status === 500) {
                msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.'
                await Popup.mostrarPopup()
                popupClose.addEventListener('click', () => Popup.fecharPopup())
                setTimeout(async () => await Popup.fecharPopup(), 3000)
                return buscarEndereco
            }
        } catch (error) {
            msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.'
            await Popup.mostrarPopup()
            popupClose.addEventListener('click', () => Popup.fecharPopup())
            setTimeout(async () => await Popup.fecharPopup(), 3000)
            return { erro: error, status: 500, message: 'Ops, falha ao se conectar com o servidor.' }
        }
    }
}

export default DeletarEndereco;
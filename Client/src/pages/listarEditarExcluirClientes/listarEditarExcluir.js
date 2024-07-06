import ListarClientes from '../../controllers/cliente/listarClientesController.js';
import buscarClienteControllers from '../../controllers/cliente/buscarClienteControllers.js';
import Popup from '../../manipularForms/popup.js';
import EditarClienteControllers from '../../controllers/cliente/editarClienteControllers.js';
import SalvarEditarEndereco from '../../controllers/endereco/salvarEditarEndereco.js';
import SalvarEditarContato from '../../controllers/contatos/ContatosControllers.js';

class ListarEditarExlcuirCliente {
    constructor() { }

    // Função para listar todos os clientes
    static async listarClientes() {
        const popupClose = document.getElementById('btnClosePop');
        const msgPopup = document.getElementById('msgPopup');
        try {
            const buscarClientes = await ListarClientes.listarClientes(); // Buscar clientes
            await buscarClienteControllers.limparDivCliente(); // Limpar tela para inserir clientes
            await ListarClientes.renderCLientes(buscarClientes); // Renderizar clientes

            document.querySelectorAll('.opcoes').forEach((e) => e.addEventListener('click', async (e) => {
                e.preventDefault()
                await EditarClienteControllers.EditClient(e) // Editar cliente
            }));
            document.querySelectorAll('.endereco').forEach((e) => e.addEventListener('click', async (e) => {
                e.preventDefault()
                await SalvarEditarEndereco.salvarEditarEndereco(e) // Salvar ou editar endereço
            }));
            document.querySelectorAll('.contato').forEach((e) => e.addEventListener('click', async (e) => {
                e.preventDefault()
                await SalvarEditarContato.salvarEditarContato(e) // Salvar ou editar contato
            }));
        } catch (error) {
            console.error(error);
            msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';
            await Popup.mostrarPopup();
            setTimeout(async () => await Popup.fecharPopup(), 5000);
            popupClose.addEventListener('click', () => Popup.fecharPopup());
        }
        const inputBuscar = document.getElementById('inputDoc');
        inputBuscar.value = ''

    }

    // Função para buscar um cliente único
    static async buscarCliente() {
        const inputBuscar = document.getElementById('inputDoc');
        const inputBuscarValue = inputBuscar.value.replace(/[^\d]/g, "");
        const popupClose = document.getElementById('btnClosePop');
        const msgPopup = document.getElementById('msgPopup');
        try {
            if (inputBuscarValue === '') {
                ListarEditarExlcuirCliente.listarClientes()
            } else {
                const cliente = await buscarClienteControllers.BuscarCliente(inputBuscarValue); // Buscar cliente
                if (cliente.status === 200) {
                    await buscarClienteControllers.renderClienteBusca(cliente); // Renderizar cliente
                    document.querySelector('.opcoes').addEventListener('click', async (e) => {
                        e.preventDefault()
                        await EditarClienteControllers.EditClient(e)
                    });
                    document.querySelectorAll('.endereco').forEach((e) => e.addEventListener('click', async (e) => {
                        e.preventDefault()
                        await SalvarEditarEndereco.salvarEditarEndereco(e)
                    }));
                    document.querySelectorAll('.contato').forEach((e) => e.addEventListener('click', async (e) => {
                        e.preventDefault()
                        await SalvarEditarContato.salvarEditarContato(e)
                    }));

                } else if (cliente.status === 404) {
                    msgPopup.innerText = cliente.message;
                    await Popup.mostrarPopup();
                    setTimeout(async () => await Popup.fecharPopup(), 5000);
                    popupClose.addEventListener('click', () => Popup.fecharPopup());
                } else if (cliente.status === 500) {
                    msgPopup.innerText = cliente.message;
                    await Popup.mostrarPopup();
                    setTimeout(async () => await Popup.fecharPopup(), 5000);
                    popupClose.addEventListener('click', () => Popup.fecharPopup());
                }
            }
        } catch (error) {
            msgPopup.innerText = error.message;
            await Popup.mostrarPopup();
            setTimeout(async () => await Popup.fecharPopup(), 5000);
            popupClose.addEventListener('click', () => Popup.fecharPopup());
        }
    }
}


// Adicionar event listener ao botão de busca
document.getElementById('btnBuscar').addEventListener('click', (e) => {
    e.preventDefault();
    ListarEditarExlcuirCliente.buscarCliente()
});



ListarEditarExlcuirCliente.listarClientes()

export default ListarEditarExlcuirCliente

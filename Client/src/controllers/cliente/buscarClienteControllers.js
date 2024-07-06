import config from "../../config/rotas.js"

// Classe para buscar um cliente
class BuscarCliente {
    constructor() { }

    //buscar cliente
    static async BuscarCliente(numDoc) {
        try {
            const cliente = await fetch(`${config.BuscarCliente}${numDoc}`).then(async response => {
                return response.json()
            }).then(data => {
                return data
            })
            return cliente
        } catch (error) {
            return { erro: error, status: 500, message: 'Ops, falha ao se conectar com o servidor.' }
        }
    }

    //renderizar cliente unico
    static async renderClienteBusca(buscarClientes) {
        await this.limparDivCliente()

        const msgPopup = document.getElementById('msgPopup');
        const popupClose = document.getElementById('btnClosePop');

        if (buscarClientes.cliente && buscarClientes.status === 200) {
            const cliente = buscarClientes.cliente
            const clientesDiv = document.getElementById('clientes')

            if (cliente.CNPJ === '') {
                const nome = document.createElement('p')
                nome.innerText = cliente.Nome

                const cpf = document.createElement('p')
                cpf.innerText = cliente.CPF

                const table = document.createElement('table')
                table.className = 'table'

                const thead = document.createElement('thead')
                const tr = document.createElement('tr')

                const thNome = document.createElement('th')
                thNome.innerText = 'Nome'

                const thDoc = document.createElement('th')
                thDoc.innerText = 'CPF'

                const tbody = document.createElement('tbody')
                const trDados = document.createElement('tr')

                const tdNome = document.createElement('td')
                tdNome.innerText = cliente.Nome

                const tdDoc = document.createElement('td')
                tdDoc.innerText = cliente.CPF

                const divCliente = document.createElement('div')
                divCliente.id = 'divCliente'
                divCliente.className = 'col-md-10 offset-md-1 card mt-2 card-body shadow-lg d-flex flex-column'

                const divRow = document.createElement('div')
                divRow.className = 'row'

                const divFlex = document.createElement('div')
                divFlex.classList = 'infos d-flex'

                const divRespo = document.createElement('div')
                divRespo.className = 'table-responsive'

                const divBtns = document.createElement('div')
                divBtns.className = 'd-flex gap-3 flex-wrap'

                const btnInspCliente = document.createElement('button')
                btnInspCliente.className = 'btn btn-primary opcoes'
                btnInspCliente.innerText = 'Opções'
                btnInspCliente.id = cliente.ID
                btnInspCliente.setAttribute("data-bs-toggle", "modal");
                btnInspCliente.setAttribute("data-bs-target", '#staticBackdrop');

                const btnEndereco = document.createElement('button')
                btnEndereco.className = 'btn btn-primary endereco'
                btnEndereco.innerText = 'Endereço'
                btnEndereco.id = cliente.ID
                btnEndereco.setAttribute("data-bs-toggle", "modal");
                btnEndereco.setAttribute("data-bs-target", '#staticBackdropEndereco');

                const btnContato = document.createElement('button')
               btnContato.className = 'btn btn-primary contato'
               btnContato.innerText = 'Contato'
               btnContato.id = cliente.ID
               btnContato.setAttribute("data-bs-toggle", "modal");
               btnContato.setAttribute("data-bs-target", '#staticBackdropContato');


                table.append(thead, tbody)
                thead.appendChild(tr)
                tr.appendChild(thNome)
                tr.appendChild(thDoc)

                tbody.appendChild(trDados)
                trDados.append(tdNome, tdDoc)

                divBtns.append(btnInspCliente, btnEndereco, btnContato)

                divCliente.append(divRow, divBtns)
                divRow.appendChild(divFlex)
                divFlex.appendChild(divRespo)
                divRespo.appendChild(table)

                clientesDiv.append(divCliente)
            } else {
                const nome = document.createElement('p')
                nome.innerText = cliente.Nome

                const cnpj = document.createElement('p')
                cnpj.innerText = cliente.CNPJ

                const table = document.createElement('table')
                table.className = 'table'

                const thead = document.createElement('thead')
                const tr = document.createElement('tr')

                const thNome = document.createElement('th')
                thNome.innerText = 'Nome'

                const thDoc = document.createElement('th')
                thDoc.innerText = 'CNPJ'

                const tbody = document.createElement('tbody')
                const trDados = document.createElement('tr')

                const tdNome = document.createElement('td')
                tdNome.innerText = cliente.Nome

                const tdDoc = document.createElement('td')
                tdDoc.innerText = cliente.CNPJ

                const divCliente = document.createElement('div')
                divCliente.id = 'divCliente'
                divCliente.className = 'col-md-10 offset-md-1 card mt-2 card-body shadow-lg d-flex flex-column'

                const divRow = document.createElement('div')
                divRow.className = 'row'

                const divFlex = document.createElement('div')
                divFlex.classList = 'infos d-flex'

                const divRespo = document.createElement('div')
                divRespo.className = 'table-responsive'

                const divBtns = document.createElement('div')
                divBtns.className = 'd-flex gap-3 flex-wrap'

                const btnInspCliente = document.createElement('button')
                btnInspCliente.className = 'btn btn-primary opcoes'
                btnInspCliente.innerText = 'Opções'
                btnInspCliente.id = cliente.ID
                btnInspCliente.setAttribute("data-bs-toggle", "modal");
                btnInspCliente.setAttribute("data-bs-target", '#staticBackdrop');

                const btnEndereco = document.createElement('button')
                btnEndereco.className = 'btn btn-primary endereco'
                btnEndereco.innerText = 'Endereço'
                btnEndereco.id = cliente.ID
                btnEndereco.setAttribute("data-bs-toggle", "modal");
                btnEndereco.setAttribute("data-bs-target", '#staticBackdropEndereco');

                const btnContato = document.createElement('button')
                btnContato.className = 'btn btn-primary contato'
                btnContato.innerText = 'Contato'
                btnContato.id = cliente.ID
                btnContato.setAttribute("data-bs-toggle", "modal");
                btnContato.setAttribute("data-bs-target", '#staticBackdropContato');

                table.append(thead, tbody)
                thead.appendChild(tr)
                tr.appendChild(thNome)
                tr.appendChild(thDoc)

                tbody.appendChild(trDados)
                trDados.append(tdNome, tdDoc)

                divBtns.append(btnInspCliente, btnEndereco, btnContato)

                divCliente.append(divRow, divBtns)
                divRow.appendChild(divFlex)
                divFlex.appendChild(divRespo)
                divRespo.appendChild(table)

                clientesDiv.append(divCliente)
            }
        } else if (buscarClientes.status == 404) { //Cliente não encontrado
            const clientes = document.getElementById('clientes')

            const divCliente = document.createElement('div')
            divCliente.id = 'divCliente'
            divCliente.className = 'col-md-10 offset-md-1 card mt-2 card-body shadow-lg d-flex flex-column'

            const semCliente = document.createElement('p')
            semCliente.innerText = 'Nenhum cliente cadastrado.'

            divCliente.appendChild(semCliente)
            clientes.appendChild(divCliente)
        } else if (buscarClientes.status === 500) {
            msgPopup.innerText = buscarClientes.message;

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        } else {
            msgPopup.innerText = 'Ops, falha ao se conectar com o servidor.';

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        }
    }


    //limpar div de clientes
    static async limparDivCliente() {
        const divClientes = document.getElementById('clientes')
        while (divClientes.firstChild) {
            divClientes.removeChild(divClientes.firstChild);
        }
    }

}

export default BuscarCliente
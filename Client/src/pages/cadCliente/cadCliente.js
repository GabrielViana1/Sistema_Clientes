// Importando a classe CadCliente do controlador de cadastro de clientes.
import CadCliente from '../../controllers/cliente/cadCliente.js';

// Importando a classe Popup para manipulação de popups.
import Popup from '../../manipularForms/popup.js';

// Importando a classe ManipularForm para manipulação de formulários.
import ManipularForm from '../../manipularForms/modeloForm.js';

// Importando a classe ResetForm para reinicialização de formulários.
import ResetForm from '../../manipularForms/resetForm.js';

// Importando a classe VerificaDoc para validação de documentos.
import VerificaDoc from '../../manipularForms/verificaDoc.js';

// Configura a máscara de CPF
Inputmask("999.999.999-99").mask(document.getElementById('inputCpf'));

// Configura a máscara de CNPJ
Inputmask("99.999.999/9999-99").mask(document.getElementById('inputCnpj'));

// Define o modelo do formulário com base no tipo de cliente selecionado.
document.getElementById('tipoCliente').addEventListener('change', async (e) => {
    e.preventDefault();
    ManipularForm.modeloForm(e.target.value);
});

// Evento de clique para cadastrar um cliente.
document.querySelector('#btnCadCliente').addEventListener('click', async (e) => {
    e.preventDefault();

    const tipoCliente = document.getElementById('tipoCliente').selectedIndex;
    const popupClose = document.getElementById('btnClosePop');
    const msgPopup = document.getElementById('msgPopup');
    let nome = document.getElementById('inputNome');
    let cpf = document.getElementById('inputCpf');
    let cnpj = document.getElementById('inputCnpj');

    // Verifica se o tipo de cliente é pessoa física (CPF) e se algum dos campos está vazio.
    if (tipoCliente === 0 && (nome.value === '' || cpf.value === '')) {

        if (cpf.value === '' && nome.value !== '') {
            nome.classList = 'form-control';
            cpf.classList = 'form-control border border-danger';
            msgPopup.innerText = 'Preencha o campo vazio!';

            await Popup.mostrarPopup(nome, cpf);

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        } else if (cpf.value !== '' && nome.value === '') {
            cpf.classList = 'form-control';
            nome.classList = 'form-control border border-danger';
            msgPopup.innerText = 'Preencha o campo vazio!';

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        } else {
            cpf.classList = 'form-control border border-danger';
            nome.classList = 'form-control border border-danger';
            msgPopup.innerText = 'Preencha os campos vazios!';

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        }
    } else if (tipoCliente === 1 && (nome.value === '' || cnpj.value === '')) {
        if (cnpj.value === '' && nome.value !== '') {
            nome.classList = 'form-control';
            cnpj.classList = 'form-control border border-danger';
            msgPopup.innerText = 'Preencha o campo vazio!';

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        } else if (cnpj.value !== '' && nome.value === '') {
            cnpj.classList = 'form-control';
            nome.classList = 'form-control border border-danger';
            msgPopup.innerText = 'Preencha o campo vazio!';

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        } else {
            cnpj.classList = 'form-control border border-danger';
            nome.classList = 'form-control border border-danger';
            msgPopup.innerText = 'Preencha os campos vazios!';

            await Popup.mostrarPopup();

            setTimeout(async () => {
                await Popup.fecharPopup();
            }, 5000);

            popupClose.addEventListener('click', function () {
                Popup.fecharPopup();
            });
        }
    } else {
        // Verificação de CPF
        if (cnpj.value === '') {
            const cpfFormatado = cpf.value.replace(/[^\d]/g, ""); // Removendo caracteres especiais 
            const verificarDoc = await VerificaDoc.validarCpf(cpfFormatado);
            if (verificarDoc) {
                const cadastro = await CadCliente.cadastrarCliente(nome.value, cpfFormatado, cnpj.value, 'Física');
                if (cadastro.status === 200) {
                    msgPopup.innerText = 'Cadastro realizado com sucesso!';

                    await Popup.mostrarPopup();

                    setTimeout(async () => {
                        await Popup.fecharPopup();
                    }, 5000);

                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });

                    ResetForm.resetForm(nome, cpf, cnpj);

                } else if (cadastro.status === 409) {
                    msgPopup.innerText = 'Esse CPF já existe no sistema.';

                    await Popup.mostrarPopup();

                    setTimeout(async () => {
                        await Popup.fecharPopup();
                    }, 5000);

                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                }
            } else {
                msgPopup.innerText = 'CPF inválido!';

                await Popup.mostrarPopup();

                setTimeout(async () => {
                    await Popup.fecharPopup();
                }, 5000);

                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
            }
        } else if (cpf.value === '') {
            const cnpjFormatado = cnpj.value.replace(/[^\d]/g, ""); // Removendo caracteres especiais 
            const verificarDoc = await VerificaDoc.validarCnpj(cnpjFormatado);
            if (verificarDoc) {
                const cadastro = await CadCliente.cadastrarCliente(nome.value, cpf.value, cnpjFormatado, 'Jurídica');
                if (cadastro.status === 200) {
                    msgPopup.innerText = 'Cadastro realizado com sucesso!';

                    await Popup.mostrarPopup();

                    setTimeout(async () => {
                        await Popup.fecharPopup();
                    }, 5000);

                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });

                    ResetForm.resetForm(nome, cpf, cnpj);

                } else if (cadastro.status === 409) {
                    msgPopup.innerText = 'Esse CNPJ já existe no sistema.';

                    await Popup.mostrarPopup();

                    setTimeout(async () => {
                        await Popup.fecharPopup();
                    }, 5000);

                    popupClose.addEventListener('click', function () {
                        Popup.fecharPopup();
                    });
                }
            } else {
                msgPopup.innerText = 'CNPJ inválido!';

                await Popup.mostrarPopup();

                setTimeout(async () => {
                    await Popup.fecharPopup();
                }, 5000);

                popupClose.addEventListener('click', function () {
                    Popup.fecharPopup();
                });
            }
        }
    }
});

// Evento de clique para limpar o formulário.
document.getElementById('limparForm').addEventListener('click', () => {
    let nome = document.getElementById('inputNome');
    let cpf = document.getElementById('inputCpf');
    let cnpj = document.getElementById('inputCnpj');

    // Limpa os campos do formulário.
    ResetForm.limparForm(nome, cpf, cnpj);
});

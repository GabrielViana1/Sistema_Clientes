// Objetivo: Arquivo responsável por manipular o formulário de cadastro de cliente, alterando os campos de acordo com o tipo de cliente selecionado
class ManipularForm {
    constructor() {}
    
    // Método estático para definir o modelo do formulário com base no tipo de cliente selecionado.
    static async modeloForm(tipo) {
        const cpfDiv = document.querySelector('.cpf')
        const cnpjDiv = document.querySelector('.cnpj')

        const nomeInput = document.querySelector('#inputNome')
        const cpfInput = document.querySelector('#inputCpf')
        const cnpjInput = document.querySelector('#inputCnpj')
        if(tipo === 'fisico') {
            cpfDiv.style.display = 'block'
            cnpjDiv.style.display = 'none'

            nomeInput.classList = 'form-control'
            cnpjInput.classList = 'form-control'
            cpfInput.classList = 'form-control'


            nomeInput.value = ''
            cpfInput.value = ''
            cnpjInput.value = ''
        } else {
            cnpjDiv.style.display = 'block'
            cpfDiv.style.display = 'none'

            nomeInput.classList = 'form-control'
            cnpjInput.classList = 'form-control'
            cpfInput.classList = 'form-control'

            nomeInput.value = ''
            cpfInput.value = ''
            cnpjInput.value = ''
        }
    }
}

export default ManipularForm
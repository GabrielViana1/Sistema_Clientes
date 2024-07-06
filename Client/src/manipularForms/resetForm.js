
// Objetivo: Resetar os campos do formulário
class ResetForm {
    constructor() {}

    static resetForm(nome, cpf, cnpj) {
        nome.classList = 'form-control'
        cpf.classList = 'form-control'
        cnpj.classList = 'form-control'
        nome.value = ''
        cpf.value = ''
        cnpj.value = ''
    }


    static limparForm(nome, cpf, cnpj) {
        nome.value = ''
        cpf.value = ''
        cnpj.value = ''
    }
}


export default ResetForm
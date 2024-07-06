// Objetivo: Verificar se o CPF ou CNPJ é válido
class VerificaDoc {
    constructor() {
       
    }

    static async validarCpf(cpf) {
         // Remove caracteres especiais e espaços em branco
    cpf = cpf.replace(/[^\d]/g, "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais, o que não é permitido
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    // Verifica se o primeiro dígito verificador está correto
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
        return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

    // Verifica se o segundo dígito verificador está correto
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
        return false;
    }

    // CPF válido
    return true;
    }

    static async validarCnpj(cnpj) {
        // Remove caracteres especiais e espaços em branco
        cnpj = cnpj.replace(/[^\d]/g, "");
    
        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }
    
        // Verifica se todos os dígitos são iguais, o que não é permitido
        if (/^(\d)\1{13}$/.test(cnpj)) {
            return false;
        }
    
        // Calcula o primeiro dígito verificador
        let soma = 0;
        let peso = 2;
        for (let i = 11; i >= 0; i--) {
            soma += parseInt(cnpj.charAt(i)) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }
        let digitoVerificador1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    
        // Verifica se o primeiro dígito verificador está correto
        if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) {
            return false;
        }
    
        // Calcula o segundo dígito verificador
        soma = 0;
        peso = 2;
        for (let i = 12; i >= 0; i--) {
            soma += parseInt(cnpj.charAt(i)) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }
        let digitoVerificador2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    
        // Verifica se o segundo dígito verificador está correto
        if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) {
            return false;
        }
    
        // CNPJ válido
        return true;
    }
    
}

export default VerificaDoc
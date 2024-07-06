//Objetivo: Arquivo responsável por manipular alertas de sucesso ou erro no banco de dados
class Popup {
    constructor() {}

    static async mostrarPopup() {
        var popup = document.getElementById('retornoErroDb');
        popup.classList.add('show');
        popup.style.display = 'block';
    }

    static async fecharPopup() {
        var popup = document.getElementById('retornoErroDb');
        popup.classList.remove('show')
        popup.style.display = 'none';
    }
}

export default Popup
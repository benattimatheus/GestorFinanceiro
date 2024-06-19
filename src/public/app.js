function Exibir(){
    let ExibirPopup = document.getElementById("Popup");
    ExibirPopup.showModal();
}

function Cancelar(){
    let cancelar = document.getElementById("Popup");
    cancelar.close();
}
const apiUrl = 'https://localhost:8080/src/controllers/app.php';
async function populateSelect() {
    try {
        // Fazendo a requisição usando fetch
        const response = await fetch(apiUrl);
        
        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        // Convertendo a resposta em JSON
        const data = await response.json();

        // Obtendo o elemento select
        const select = document.getElementById('categoria');
        
        // Removendo a opção "Carregando..."
        select.innerHTML = '';

        // Iterando sobre os dados e criando as opções
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.value; // Assumindo que o JSON tem um campo "value"
            option.text = item.text; // Assumindo que o JSON tem um campo "text"
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro:', error);
        // Tratamento de erro (opcional)
        const select = document.getElementById('categoria');
        select.innerHTML = '<option value="" disabled>Erro ao carregar opções</option>';
    }
}
// Chamada da função para popular o seletor ao carregar a página
window.onload = populateSelect;

// colocar máscara para o campo valor

// function formatCurrency(value) {
//     // value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
//     value = (value / 100).toFixed(2) + ''; // Divide por 100 para transformar em decimal e fixa duas casas decimais
//     value = value.replace(".", ","); // Substitui ponto por vírgula
//     value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona pontos a cada 3 dígitos
//     return value;
// }

// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('valor').addEventListener('input', function (e) {
//         e.target.value = formatCurrency(e.target.value);
//     });
// });

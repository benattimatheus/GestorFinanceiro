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

function MascaraValor() {
    let input = document.getElementById("valor");
    VerificaValor(input);
}

function VerificaValor(Num) {
    if (Num.value.length <= 0) {
        Num.value = "0.000";
    }
    let padrao = Num.value;
    padrao = padrao + "";
    padrao = parseInt(padrao.replace(/[\D]+/g, ""));
    padrao = padrao + "";
    padrao = padrao.replace(/([0-9]{2})$/g, ".$1");
    if (padrao.length > 4) {
        padrao = padrao.replace(/([0-9]{2}).([0-9]{3}$)/g, ".$1.$2");
    }
    Num.value = padrao;
}



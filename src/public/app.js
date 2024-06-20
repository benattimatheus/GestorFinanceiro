// -------------------------Função De Resquest------------------------------

const Caminho = '/src/controllers/app.php';
async function populateSelect() {
    try {
        
        const resposta = await fetch(Caminho);

        
        const dados = await resposta.json();
        console.log(dados);
        
        const select = document.getElementById('categoria');
        
        select.innerHTML = '';

        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.value; // Assumindo que o JSON tem um campo "value"
            option.text = item.categoria; // Assumindo que o JSON tem um campo "text"
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro:', error);
        const select = document.getElementById('categoria');
        select.innerHTML = '<option value="" disabled>Erro ao carregar opções</option>';
    }
}
window.onload = populateSelect;



// -------------------------Função para a tabela------------------------------


function getMesAtual() {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const nomeMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return { mes: mesAtual, nome: nomeMeses[mesAtual] };
}

function preencherSelectMes() {
    const selectMes = document.getElementById('Mes');
    const nomeMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    nomeMeses.forEach((mes, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = mes;
        selectMes.appendChild(option);
    });

    const mesAtual = getMesAtual().mes;
    selectMes.value = mesAtual;
}

preencherSelectMes();


// -------------------------Função HTML------------------------------
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

function Exibir(){
    let ExibirPopup = document.getElementById("Popup");
    ExibirPopup.showModal();
}

function Cancelar(){
    let cancelar = document.getElementById("Popup");
    cancelar.close();
}



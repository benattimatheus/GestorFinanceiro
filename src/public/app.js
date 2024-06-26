// -------------------------Função onload------------------------------


window.onload = function() {
    populateSelect()
    preencherSelectMes();
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('id').value = gerarID();

});

function gerarID() {
    return Math.floor(Date.now());
}

// -------------------------Função De Request------------------------------


async function populateSelect() {
    const Caminho = '../src/controllers/RequestPopulateSelector.php';
    try {
        const resposta = await fetch(Caminho);
        const dados = await resposta.json();
        const select = document.getElementById('categoria');
        const tiposelecionado = document.getElementById('tipo');
        select.innerHTML = '<option value="" disabled selected>Selecione uma categoria</option>';
        dados.forEach(item => {
            let DadoBanco_convertido = Number(item.tipo);
            let TipoSelecionado = Number(tiposelecionado.value);  //Receita (1) ou Despesa (0)
            if (DadoBanco_convertido === TipoSelecionado) {
                const option = document.createElement('option');
                option.value = item.id; // Configurando o ID como o valor
                option.text = item.categoria;
                select.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Erro:', error);
        const select = document.getElementById('categoria');
        select.innerHTML = '<option value="" disabled>Erro ao carregar opções</option>';
    }
}



// -------------------------Função para tabela------------------------------

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
        option.value = index + 1; 
        option.textContent = mes;
        selectMes.appendChild(option);
    });

    const mesAtual = getMesAtual().mes + 1; 
    selectMes.value = mesAtual;

    selectMes.addEventListener('change', () => {
        populateTable(selectMes.value);
    });

    populateTable(mesAtual);
}

async function populateTable(mes) {
    const Caminho = `/src/controllers/RequestTabela.php?mes=${mes}`;  
    try {
        const respostaT = await fetch(Caminho);
        const dadosT = await respostaT.json();

        const tabela = document.querySelector('#historico tbody');
        tabela.innerHTML = '';

        let totalReceita = 0;
        let totalDespesa = 0;

        const adicionarLinha = (tipo, item) => {
            const row = tabela.insertRow();
            const idCell = row.insertCell(0);
            idCell.textContent = item.id;
            idCell.style.display = 'none'; 

            row.insertCell(1).textContent = tipo;
            row.insertCell(2).textContent = `R$ ${parseFloat(item.valor).toFixed(2)}`;
            row.insertCell(3).textContent = item.datas;
            row.insertCell(4).textContent = item.descricao;
            row.insertCell(5).textContent = item.categoria_nome;

            const actionsCell = row.insertCell(6);
            actionsCell.classList.add('acoesJS');
            actionsCell.innerHTML = `
                <button class="editar" onclick="editarItem('${tipo}', ${item.id})">Editar</button>
                <button class="excluir" onclick="excluirItem('${tipo}', ${item.id})">Excluir</button>
            `;

            if (tipo === 'Receita') {
                totalReceita += parseFloat(item.valor);
            } else if (tipo === 'Despesa') {
                totalDespesa += parseFloat(item.valor);
            }
        };

        dadosT.receitas.forEach(item => adicionarLinha('Receita', item));
        dadosT.despesas.forEach(item => adicionarLinha('Despesa', item));

        document.getElementById('totalReceita').textContent = `R$ ${totalReceita.toFixed(2)}`;
        document.getElementById('totalDespesa').textContent = `R$ ${totalDespesa.toFixed(2)}`;
        document.getElementById('saldo').textContent = `R$ ${(totalReceita - totalDespesa).toFixed(2)}`;
    } catch (error) {
        console.error('Erro:', error);
        const tabela = document.querySelector('#historico tbody');
        tabela.innerHTML = '<tr><td colspan="6">Erro ao carregar dados</td></tr>';
    }
}

// -------------------------Função HTML index ------------------------------
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
// -------------------------Função para popup------------------------------

function Exibir(){
    let ExibirPopup = document.getElementById("Popup");
    ExibirPopup.showModal();
}

function Cancelar(){
    let cancelar = document.getElementById("Popup");
    cancelar.close();
}

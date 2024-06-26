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
                <button class="editar" type="button" onclick="ExibirEditar('${tipo}', ${item.id})">Editar</button>
                <button class="excluir" type="button" onclick="ExibirApagar('${tipo}', ${item.id})">Excluir</button>
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

function Cancelar() {
    let cancelar = document.getElementById("Popup");
    let cancelar2 = document.getElementById("Popup-editar-categoria");
    let cancelar3 = document.getElementById("Popup-apagar-categoria");
    if (cancelar) cancelar.close();
    if (cancelar2) cancelar2.close();
    if (cancelar3) cancelar3.close();
}

// -------------------------Função HTML editar dados ------------------------------

function ExibirEditar(tipo, id) {
    let ExibirPopup = document.getElementById("Popup-editar-categoria");
    ExibirPopup.showModal();

    let tipoNumerico;
    if (tipo === "Receita") {
        tipoNumerico = 1;
    } else if (tipo === "Despesa") {
        tipoNumerico = 0;
    }
    populateSelectForEdit(tipoNumerico).then(() => {
        const tabela = document.querySelector('#historico tbody');
        const rows = tabela.getElementsByTagName('tr');
        for (let row of rows) {
            if (row.cells[0].textContent == id) {
                document.getElementById('editar-valor').value = row.cells[2].textContent.replace('R$ ', '');
                document.getElementById('editar-datas').value = row.cells[3].textContent;
                document.getElementById('editar-descricao').value = row.cells[4].textContent;
                document.getElementById('editar-categoria').value = row.cells[5].dataset.id; 
                document.getElementById('editar-id').value = id;
                break;
            }
        }
    });
}

async function populateSelectForEdit(tipoNumerico) {
    const Caminho = '../src/controllers/RequestPopulateSelectorEdit.php';
    try {
        const resposta = await fetch(Caminho, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo: tipoNumerico })
        });

        const dados = await resposta.json();
        console.log('Dados recebidos:', dados); // Adicione esta linha para depuração
        const select = document.getElementById('editar-categoria');
        select.innerHTML = '<option value="" disabled selected>Selecione uma categoria</option>';
        dados.forEach(item => {
            let DadoBanco_convertido = Number(item.tipo);
            if (DadoBanco_convertido === Number(tipoNumerico)) {
                const option = document.createElement('option');
                option.value = item.id;
                option.text = item.categoria;
                select.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Erro:', error);
        const select = document.getElementById('editar-categoria');
        select.innerHTML = '<option value="" disabled>Erro ao carregar opções</option>';
    }
}

function SalvarEdicao() {
    const id = document.getElementById('editar-id').value;
    const valor = document.getElementById('editar-valor').value;
    const datas = document.getElementById('editar-datas').value;
    const descricao = document.getElementById('editar-descricao').value;
    const categoriaId = document.getElementById('editar-categoria').value;
    const tipoNumerico = document.getElementById('tipo').value;

    const data = {
        id,
        tipoNumerico,
        valor,
        datas,
        descricao,
        categoriaId,
    };

    const Caminho = '../src/controllers/RequestEditarTransacao.php';
    fetch(Caminho, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados atualizados:', data);
        // Close the popup and refresh the table
        document.getElementById("Popup-editar-categoria").close();
        location.reload();
    })
    .catch(error => {
        console.error('Erro:', error);
        // Display an error message to the user
        alert('Erro ao atualizar dados');
    });
    
}

// -------------------------Função para Exclusão de dados------------------------------

function ExibirApagar(tipo, id) {
    let ExibirPopup = document.getElementById("Popup-apagar-categoria");
    ExibirPopup.showModal();
    document.getElementById('sim-apagar').onclick = function() {
        apagarTransacao(tipo, id);
    };
}

// Função para apagar a transação
async function apagarTransacao(tipo, id) {
    try {
        const response = await fetch('/src/controllers/RequestApagarTransacao.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, id })
        });

        const result = await response.json();

        if (result.success) {
            const selectMes = document.getElementById('Mes');
            const mesAtual = selectMes.value;
            populateTable(mesAtual);
            // alert('Transação apagada com sucesso!');
            Cancelar();
        } else {
            alert('Erro ao apagar a transação, sem sucesso');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao apagar a transação');
    }
}
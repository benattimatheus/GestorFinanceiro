// -------------------------Função onload------------------------------

window.onload = function() {
    populateCategories();
};

// -------------------------Função para popup------------------------------
function Exibir(){
    let ExibirPopup = document.getElementById("Popup");
    ExibirPopup.showModal();
}

function ExibirApagar(){
    let ExibirPopup = document.getElementById("Popup-apagar-categoria");
    ExibirPopup.showModal();
}

function Cancelar(){
    let cancelar = document.getElementById("Popup");
    let cancelar2 =document.getElementById("Popup-editar-categoria");
    let cancelar3 =document.getElementById("Popup-apagar-categoria");
    cancelar.close();
    cancelar2.close();
    cancelar3.close();
}
// -------------------------Função HTML categorias ------------------------------

async function populateCategories() {
    const Caminho = '/src/controllers/RequestTabelaCategoria.php';
    try {
        const resposta = await fetch(Caminho);
        const dados = await resposta.json();

        const tabela = document.querySelector('.table tbody');
        tabela.innerHTML = '';

        dados.categorias.forEach(item => {
            const row = tabela.insertRow();
            const idCell = row.insertCell(0);
            idCell.textContent = item.id;
            idCell.style.display = 'none';
            const categoriaCell = row.insertCell(1);
            categoriaCell.textContent = item.categoria;
            const tipoCell = row.insertCell(2);
            tipoCell.textContent = item.tipo;
            const actionsCell = row.insertCell(3);
            actionsCell.innerHTML = `
            <div class="icones">
              <div></div> 
              <div class="EditarApagar">
                <i href="#" type="button" name="Editar" class="editar fa-solid fa-pencil" onclick="ExibirEditar(${item.id})"></i>
                <i href="#" type="button" name="Cancelar" class="fa-solid fa-trash" onclick="ExibirApagar(${item.id})"></i>
              </div>
              <div></div>
            </div>
            `;
        });
    } catch (error) {
        console.error('Erro:', error);
        const tabela = document.querySelector('.table tbody');
        tabela.innerHTML = '<tr><td colspan="4">Erro ao carregar dados</td></tr>';
    }
}
// -------------------------Função HTML cadastrar categorias ------------------------------
async function CadastrarCategoria() {
    const Caminho = '/src/controllers/RequestCadastroCategoria.php';
    let Tipovalue= document.getElementById('tipo');
    const tipo = Tipovalue.value; 
    let CategoriaValue= document.getElementById('nome');
    const categoria= CategoriaValue.value; 
    try {
        const resposta = await fetch(Caminho, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ tipo, categoria }) 
        });
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        console.log(dados); 
        let FecharPopup = document.getElementById("Popup");
        FecharPopup.close();
        location.reload();
        return dados; 
    } catch (erro) {
        console.error('Erro ao cadastrar categoria:', erro);
    }
}

// -------------------------Função HTML editar categorias ------------------------------

function ExibirEditar(id) {
    let ExibirPopup = document.getElementById("Popup-editar-categoria");
    ExibirPopup.showModal();

    const tabela = document.querySelector('.table tbody');
    const rows = tabela.getElementsByTagName('tr');
    for (let row of rows) {
        if (row.cells[0].textContent == id) {
            document.getElementById('editar-nome').value = row.cells[1].textContent;
            document.getElementById('editar-tipo').value = row.cells[2].textContent == 'Receita' ? 1 : 0;
            document.getElementById('editar-id').value = id;
            break;
        }
    }
}

async function salvarEdicao() {
    const id = document.getElementById('editar-id').value;
    const nome = document.getElementById('editar-nome').value;
    const tipo = document.getElementById('editar-tipo').value;

    const data = { id, nome, tipo };

    try {
        const response = await fetch('/src/controllers/RequestEditarCategoria.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            populateCategories();
            Cancelar();
        } else {
            alert('Erro ao atualizar a categoria');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar a categoria');
    }
}

document.getElementById('salvar').addEventListener('click', salvarEdicao);


// -------------------------Função HTML excluir categorias ------------------------------

function ExibirApagar(id) {
    let ExibirPopup = document.getElementById("Popup-apagar-categoria");
    ExibirPopup.showModal();
    document.getElementById('sim-apagar').onclick = function() {
        apagarCategoria(id);
    };
}

async function apagarCategoria(id) {
    try {
        const response = await fetch('/src/controllers/RequestApagarCategoria.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const result = await response.json();

        if (result.success) {
            populateCategories();
            Cancelar();
        } else {
            alert('Erro ao apagar a categoria');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao apagar a categoria');
    }
}

document.getElementById('sim-apagar').addEventListener('click', apagarCategoria);
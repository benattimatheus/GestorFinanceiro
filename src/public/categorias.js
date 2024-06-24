// -------------------------Função onload------------------------------

window.onload = function() {
    populateCategories();
};

// -------------------------Função para popup------------------------------
function Exibir(){
    let ExibirPopup = document.getElementById("Popup");
    ExibirPopup.showModal();
}

function ExibirEditar(){
    let ExibirPopup = document.getElementById("Popup-editar-categoria");
    ExibirPopup.showModal();
}

function ExibirApagar(){
    let ExibirPopup = document.getElementById("Popup-apagar-categoria");
    ExibirPopup.showModal();
}

function Cancelar(){
    let cancelar = document.getElementById("Popup");
    cancelar.close();
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

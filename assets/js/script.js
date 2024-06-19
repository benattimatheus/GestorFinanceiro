function ExibirPopup(){
    let ExibirPopup = document.getElementById("Popup");
    ExibirPopup.showModal();
}

function CancelarPopup(){
    let cancelar = document.getElementById("Popup");
    cancelar.close();
}



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

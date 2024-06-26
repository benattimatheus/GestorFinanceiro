document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mes = urlParams.get('mes');
    if (mes) {
      populateTablePDF(mes);
      document.getElementById('nomeMes').textContent = getNomeMes(mes);
    }
  });

  function getNomeMes(mes) {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  }

  async function populateTablePDF(mes) {
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
        row.insertCell(0).textContent = tipo;
        row.insertCell(1).textContent = `R$ ${parseFloat(item.valor).toFixed(2)}`;
        row.insertCell(2).textContent = item.datas;
        row.insertCell(3).textContent = item.descricao;
        row.insertCell(4).textContent = item.categoria_nome;

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

      window.print();
    } catch (error) {
      console.error('Erro:', error);
      const tabela = document.querySelector('#historico tbody');
      tabela.innerHTML = '<tr><td colspan="5">Erro ao carregar dados</td></tr>';
    }
  }

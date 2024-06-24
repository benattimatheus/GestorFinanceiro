<?php

require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/../models/Categoria.php';
require_once __DIR__ . '/../models/CategoriaModel.php';
require_once __DIR__ . '/../models/Despesa.php';
require_once __DIR__ . '/../models/DespesaModel.php';
require_once __DIR__ . '/../models/Receita.php';
require_once __DIR__ . '/../models/ReceitaModel.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tipo = $_POST['tipo']; 
    if ($tipo == '0') {
        $despesa = new Despesa( id: $_POST['id'],
                        valor: $_POST['valor'],
                        descricao: $_POST['descricao'],
                        datas: $_POST['datas'],
                        categoria: $_POST['categoria']
        );
        $despesaModelo = new DespesaModel($despesa);
        $despesaModelo->save();

    } else{
        $receita = new Receita( id: $_POST['id'],
                        valor: $_POST['valor'],
                        descricao: $_POST['descricao'],
                        datas: $_POST['datas'],
                        categoria: $_POST['categoria']
        );

        $receitaModelo = new ReceitaModel($receita);
        $receitaModelo->save();
    }
}

header('Location: ../../../index.html');
exit;


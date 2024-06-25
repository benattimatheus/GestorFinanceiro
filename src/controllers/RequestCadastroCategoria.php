<?php
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/../models/Categoria.php';
require_once __DIR__ . '/../models/CategoriaModel.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->categoria)) {
    $categoria = new Categoria($data->tipo, $data->categoria);

    $categoriaModel = new CategoriaModel($categoria);

    if($categoriaModel->save()) {
        http_response_code(201); 
        echo json_encode(array("message" => "Categoria cadastrada com sucesso."));
    } else {
        http_response_code(503); 
        echo json_encode(array("message" => "Não foi possível cadastrar a categoria."));
    }
} else {
    http_response_code(400); 
    echo json_encode(array("message" => "Dados incompletos."));
}

<?php
require_once __DIR__ . '../models/Select.php';

$select = new Select();
$id = filter_input(INPUT_GET, 'id');

if($id){
    $select->deleteNotaRa($id);
    $select->deleteAlunoRa($id);
    header('Location: ../../../index.html');
    exit(); 
} else {
    echo "RA não fornecido.";
}
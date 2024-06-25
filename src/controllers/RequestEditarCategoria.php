<?php

require_once __DIR__ . '/../database/Database.php';

class RequestEditarCategoria {
    public static function editarCategoria($id, $nome, $tipo)
    {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("
                UPDATE categoria
                SET categoria = :nome, tipo = :tipo
                WHERE id = :id
            ");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $nome);
            $stmt->bindParam(':tipo', $tipo);
            $stmt->execute();

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $nome = $data['nome'];
    $tipo = $data['tipo'];

    RequestEditarCategoria::editarCategoria($id, $nome, $tipo);
}
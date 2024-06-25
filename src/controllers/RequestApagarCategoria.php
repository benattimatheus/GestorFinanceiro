<?php

require_once __DIR__ . '/../database/Database.php';

class RequestApagarCategoria {
    public static function apagarCategoria($id)
    {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("DELETE FROM categoria WHERE id = :id");
            $stmt->bindParam(':id', $id);
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

    RequestApagarCategoria::apagarCategoria($id);
}
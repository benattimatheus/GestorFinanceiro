<?php

require_once __DIR__ .'/../database/Database.php';

class RequestPopulateSelectorEdit {
    public static function getOpcoes($tipo) {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("SELECT id, categoria FROM categoria WHERE tipo = :tipo");
            $stmt->bindParam(':tipo', $tipo, PDO::PARAM_INT);
            $stmt->execute();
            $opcoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($opcoes);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}

$input = json_decode(file_get_contents('php://input'), true);
$tipo = isset($input['tipo']) ? $input['tipo'] : null;

if ($tipo !== null) {
    RequestPopulateSelectorEdit::getOpcoes($tipo);
} else {
    echo json_encode(['error' => 'Tipo não fornecido']);
}
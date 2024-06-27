<?php

require_once __DIR__ . '/../database/Database.php';

class RequestSelectCategoriaPorNome {
    public static function getOpcoes($categoria) {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("SELECT id FROM categoria WHERE categoria = :categoria LIMIT 1");
            $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
            $stmt->execute();
            $opcao = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($opcao) {
                echo json_encode(['success' => true, 'data' => $opcao]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Categoria não encontrada']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}

$input = json_decode(file_get_contents('php://input'), true);
$categoria = isset($input['categoria']) ? $input['categoria'] : null;

if ($categoria !== null) {
    RequestSelectCategoriaPorNome::getOpcoes($categoria);
} else {
    echo json_encode(['success' => false, 'message' => 'Categoria não fornecida']);
}
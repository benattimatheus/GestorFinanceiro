<?php

require_once __DIR__ . '/../database/Database.php';

class RequestApagarTransacao {
    public static function apagarTransacao($tipo, $id)
    {
        try {
            $pdo = Database::getConn();
            $pdo->beginTransaction();

            if ($tipo == 'Receita') {
                $stmt = $pdo->prepare("DELETE FROM receitas WHERE id = :id");
            } else {
                $stmt = $pdo->prepare("DELETE FROM despesas WHERE id = :id");
            }

            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $pdo->commit();

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            $pdo->rollBack();
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $tipo = $data['tipo'];  // Certificar que a variável $tipo está sendo definida aqui
    $id = $data['id'];

    RequestApagarTransacao::apagarTransacao($tipo, $id);
}


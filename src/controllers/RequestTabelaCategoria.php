<?php

require_once __DIR__ . '/../database/Database.php';

class RequestTabelaCategorias {
    public static function getCategorias()
    {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("
                SELECT id, categoria, 
                CASE 
                    WHEN tipo = 1 THEN 'Receita' 
                    ELSE 'Despesa' 
                END AS tipo
                FROM categoria
            ");
            $stmt->execute();
            $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['categorias' => $categorias]);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    RequestTabelaCategorias::getCategorias();
}
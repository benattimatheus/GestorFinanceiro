<?php

require_once __DIR__ .'/../database/Database.php';

class RequestPopulateSelector
{
    public static function getOpcoes()
    {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("SELECT id, categoria, tipo FROM categoria"); // Adicionado o 'tipo' no select do banco
            $stmt->execute();
            $opcoes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch as associative array
            echo json_encode($opcoes);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}
RequestPopulateSelector::getOpcoes();

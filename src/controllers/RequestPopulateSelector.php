<?php

require_once __DIR__ .'/../database/Database.php';

class RequestPopulateSelector
{
    public static function getOpcoes()
    {
        try {
            $pdo = Database::getConn();
            $stmt = $pdo->prepare("SELECT categoria FROM categoria");
            $stmt->execute();
            $opcoes = $stmt->fetchAll();
            echo json_encode($opcoes);
        } catch (PDOException $e) {
            
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}
RequestPopulateSelector::getOpcoes();
<?php

require_once __DIR__ .'/../database/Database.php';

class OpcoesController
{
    public static function getOpcoes()
    {
        try {
            // Obtendo a conexão com o banco de dados usando a classe Database
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

// Chamando o método para obter as opções e retornar o JSON
OpcoesController::getOpcoes();
<?php

require_once __DIR__ .'/../database/Database.php';

class OpcoesController
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

    public static function getDadosPorMes($mes)
    {
        try {
            $pdo = Database::getConn();

            $stmtReceitas = $pdo->prepare("SELECT * FROM receitas WHERE MONTH(data) = :mes");
            $stmtReceitas->bindParam(':mes', $mes, PDO::PARAM_INT);
            $stmtReceitas->execute();
            $receitas = $stmtReceitas->fetchAll(PDO::FETCH_ASSOC);

            $stmtDespesas = $pdo->prepare("SELECT * FROM despesas WHERE MONTH(data) = :mes");
            $stmtDespesas->bindParam(':mes', $mes, PDO::PARAM_INT);
            $stmtDespesas->execute();
            $despesas = $stmtDespesas->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['receitas' => $receitas, 'despesas' => $despesas]);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
    
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['mes'])) {
        OpcoesController::getDadosPorMes((int)$_GET['mes']);
    }
}

OpcoesController::getOpcoes();
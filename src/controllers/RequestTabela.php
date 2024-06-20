<?php

require_once __DIR__ . '/../database/Database.php';



class RequestTabela{

public static function getDadosPorMes()
{
    try {
        $pdo = Database::getConn();

        $stmtReceitas = $pdo->prepare("SELECT * FROM receitas");    
        // $stmtReceitas->bindParam(':mes', $mes, PDO::PARAM_INT);
        $stmtReceitas->execute();
        $receitas = $stmtReceitas->fetchAll(PDO::FETCH_ASSOC);

        $stmtDespesas = $pdo->prepare("SELECT * FROM despesas");
        // $stmtDespesas->bindParam(':mes', $mes, PDO::PARAM_INT);
        $stmtDespesas->execute();
        $despesas = $stmtDespesas->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['receitas' => $receitas, 'despesas' => $despesas]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
    }
}

}


// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
// if (isset($_GET['mes'])) {
//     RequestTabela::getDadosPorMes((int)$_GET['mes']);
// }
// }

RequestTabela::getDadosPorMes();
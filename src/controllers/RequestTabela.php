<?php

require_once __DIR__ . '/../database/Database.php';


class RequestTabela {
    public static function getDadosPorMes($mes)
    {
        try {
            $pdo = Database::getConn();
            $mesFormatado = str_pad($mes, 2, '0', STR_PAD_LEFT);

            $stmtReceitas = $pdo->prepare("
                SELECT receitas.id, receitas.valor, receitas.datas, receitas.descricao, categoria.categoria AS categoria_nome
                FROM receitas
                JOIN categoria ON receitas.categoria = categoria.id
                WHERE receitas.datas LIKE :mes ORDER BY datas
            ");
            $stmtReceitas->bindValue(':mes', '%-' . $mesFormatado . '-%', PDO::PARAM_STR);
            $stmtReceitas->execute();
            $receitas = $stmtReceitas->fetchAll(PDO::FETCH_ASSOC);

            $stmtDespesas = $pdo->prepare("
                SELECT despesas.id, despesas.valor, despesas.datas, despesas.descricao, categoria.categoria AS categoria_nome
                FROM despesas
                JOIN categoria ON despesas.categoria = categoria.id
                WHERE despesas.datas LIKE :mes ORDER BY datas
            ");
            $stmtDespesas->bindValue(':mes', '%-' . $mesFormatado . '-%', PDO::PARAM_STR);
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
        RequestTabela::getDadosPorMes((int)$_GET['mes']);
    }
}
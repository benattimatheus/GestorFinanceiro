<?php

require_once __DIR__ . '/../database/Database.php';

class RequestEditarCategoria {
    public static function editarTransacao($id, $tipo, $valor, $datas, $descricao, $categoria)
    {
        try {
            $pdo = Database::getConn();
            $pdo->beginTransaction();

            if ($tipo == 'Receita') {
                $stmt = $pdo->prepare("UPDATE receitas set valor = :valor, datas = :datas, descricao = :descricao, categoria = :categoria where id = :id");
            } else {
                $stmt = $pdo->prepare("UPDATE despesas set valor = :valor, datas = :datas, descricao = :descricao, categoria = :categoria where id = :id");
            }

            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':datas', $datas);
            $stmt->bindParam(':descricao', $descricao);
            $stmt->bindParam(':categoria', $categoria);
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
    $id = $data['id'];
    $nome = $data['nome'];
    $tipo = $data['tipo'];

    RequestEditarTransacao::editarTransacao($id, $tipo, $valor, $datas, $descricao, $categoria);
}
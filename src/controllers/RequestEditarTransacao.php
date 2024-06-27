<?php

require_once __DIR__ . '/../database/Database.php';

class RequestEditarTransacao {
    public static function editarTransacao($id, $tipo, $valor, $datas, $descricao, $categoria)
    {
        try {
            $pdo = Database::getConn();
            $pdo->beginTransaction();

            if ($tipo == 1) {
                $stmt = $pdo->prepare("UPDATE receitas SET valor = :valor, descricao = :descricao, datas = :datas, categoria = :categoria WHERE id = :id");
            } else if ($tipo == 0) {
                $stmt = $pdo->prepare("UPDATE despesas SET valor = :valor, descricao = :descricao, datas = :datas, categoria = :categoria WHERE id = :id");
            } else {
                throw new Exception("Tipo de transação inválido.");
            }

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':datas', $datas);
            $stmt->bindParam(':descricao', $descricao);
            $stmt->bindParam(':categoria', $categoria, PDO::PARAM_INT);
            $stmt->execute();
            $pdo->commit();

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            $pdo->rollBack();
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'], $data['tipo'], $data['valor'], $data['datas'], $data['descricao'], $data['categoria'])) {
        $id = $data['id'];
        $tipo = (int) $data['tipo']; // Converte para inteiro
        $valor = $data['valor'];
        $datas = $data['datas'];
        $descricao = $data['descricao'];
        $categoria = $data['categoria'];
        RequestEditarTransacao::editarTransacao($id, $tipo, $valor, $datas, $descricao, $categoria);
    } else {
        echo json_encode(['error' => 'Dados incompletos']);
    }
}
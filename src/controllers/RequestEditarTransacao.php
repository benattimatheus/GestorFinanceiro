PHP
<?php

require_once __DIR__ . '/../database/Database.php';

class RequestEditarTransacao {
    public static function editarTransacao($id, $tipo, $valor, $datas, $descricao, $categoria) {
        try {
            $pdo = Database::getConn();
            $pdo->beginTransaction();

            // Verifica e converte o tipo para maiúsculas

            // Valida o tipo de transação
            if ($tipo !== 'Receita' && $tipo !== 'Despesa') {
                echo json_encode(['error' => 'Tipo de transação inválido: ' . $tipo]);
                return;
            }

            // Define a tabela de acordo com o tipo
            $tabela = ($tipo === 'Receita') ? 'receitas' : 'despesas';

            // Prepara a consulta SQL
            $sql = "UPDATE $tabela SET valor = :valor, datas = :datas, descricao = :descricao, categoria = :categoria WHERE id = :id";
            $stmt = $pdo->prepare($sql);

            // Bind dos parâmetros
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':datas', $datas);
            $stmt->bindParam(':descricao', $descricao);
            $stmt->bindParam(':categoria', $categoria);

            // Executa a consulta
            $stmt->execute();
            $pdo->commit();

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            $pdo->rollBack();
            echo json_encode([
                'error' => 'Erro ao atualizar transação: ' . $e->getMessage(),
            ]);
        }
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodifica os dados enviados como JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Extrai os dados do JSON
    $id = $data['id'];
    $valor = $data['valor'];
    $datas = $data['datas'];
    $descricao = $data['descricao'];
    $categoria = $data['categoria'];
    $tipo = $data['tipo']; // Certifique-se de que 'tipo' está sendo enviado corretamente do JavaScript

    // Chama o método estático para editar a transação
    RequestEditarTransacao::editarTransacao($id, $tipo, $valor, $datas, $descricao, $categoria);
}


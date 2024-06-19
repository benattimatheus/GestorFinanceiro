<?php
class OpcoesController
{
    public static function getOpcoes()
    {
        try {
            // Obtendo a conexão com o banco de dados usando a classe Database
            $pdo = Database::getConn();

            // Query para selecionar os dados
            $stmt = $pdo->prepare("SELECT id, nome FROM opcoes");
            $stmt->execute();

            // Obtendo os resultados
            $opcoes = $stmt->fetchAll();

            // Transformando os resultados em JSON e respondendo a requisição
            echo json_encode($opcoes);
        } catch (PDOException $e) {
            // Em caso de erro, retornar uma mensagem de erro
            echo json_encode(['error' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
        }
    }
}

// Chamando o método para obter as opções e retornar o JSON
OpcoesController::getOpcoes();
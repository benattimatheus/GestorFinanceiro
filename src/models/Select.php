<?php

require '../database/Database.php';

class Select{
    
    public static function getCategorias()
    {
        $stmt = Database::getConn()->prepare('SELECT categoria FROM categoria ORDER BY categoria');
        $stmt->execute();
        return $stmt->fetchall(PDO::FETCH_ASSOC);
    }

    public static function getAll()
    {
    $stmt = Database::getConn()->prepare('SELECT valor, descricao, datas, categoria FROM receitas');
    $stmt->execute();
    $receitas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt2 = Database::getConn()->prepare('SELECT valor, descricao, datas, categoria FROM despesas');
    $stmt2->execute();
    $despesas = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    return [
        'receitas' => $receitas,
        'despesas' => $despesas
    ];
    }

    public static function updateReceita($id, $valor, $descricao, $datas, $categoria)
    {
        $stmt = Database::getConn()->prepare('
        UPDATE receitas
        SET valor = :valor,
            descricao = :descricao,
            datas = :datas,
            categoria = :categoria
        WHERE id = :id
        ');

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':valor', $valor, PDO::PARAM_INT);
        $stmt->bindParam(':descricao', $descricao, PDO::PARAM_STR);
        $stmt->bindParam(':datas', $datas, PDO::PARAM_STR);
        $stmt->bindParam(':categoria', $categoria, PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function deleteReceita($id)
    {
        $stmt = Database::getConn()->prepare('DELETE FROM receitas WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }

    public static function updateDespesa($id, $valor, $descricao, $datas, $categoria)
    {
        $stmt = Database::getConn()->prepare('
        UPDATE despesas
        SET valor = :valor,
            descricao = :descricao,
            datas = :datas,
            categoria = :categoria
        WHERE id = :id
        ');

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':valor', $valor, PDO::PARAM_INT);
        $stmt->bindParam(':descricao', $descricao, PDO::PARAM_STR);
        $stmt->bindParam(':datas', $datas, PDO::PARAM_STR);
        $stmt->bindParam(':categoria', $categoria, PDO::PARAM_INT);

        $stmt->execute();
    }

    public static function deleteDespesa($id)
    {
        $stmt = Database::getConn()->prepare('DELETE FROM despesas WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }
}


// if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getAll') {
//     $data = Select::getAll(); // Supondo que Select::getAll() retorna um array associativo com 'receitas' e 'despesas'
//     header('Content-Type: application/json');
//     echo json_encode($data);
//     exit;
// }

// if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getCategorias') {
//     header('Content-Type: application/json');
//     echo json_encode(Select::getCategorias());
//     exit;
// }


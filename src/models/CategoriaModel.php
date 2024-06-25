<?php

// require '../database/Database.php';

class CategoriaModel
{
    private Categoria $categoria;

    public function __construct(Categoria $categoria){
        $this->categoria = $categoria;
    }

    public function save()
    {
        $stmt = Database::getConn()->prepare('INSERT INTO categoria (tipo, categoria)
        VALUES (:tipo, :categoria)'); 

        // $id = $this->categoria->getID();
        $tipo = $this->categoria->getTipo();
        $categoria = $this->categoria->getCategoria();

        // $stmt->bindParam(':id', $id);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->bindParam(':categoria', $categoria);

        return $stmt->execute();
    }

}
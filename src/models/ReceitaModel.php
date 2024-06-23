<?php

class ReceitaModel
{
    private Receita $receita;

    public function __construct(Receita $receita){
        $this->receita = $receita;
    }

    public function save()
    {
        $stmt = Database::getConn()->prepare('INSERT INTO receitas (id, valor, descricao, data, categoria)
        VALUES (:id, :valor, :descricao, :data, :categoria;'); 

        $id = $this->receita->getID();
        $valor = $this->receita->getValor();
        $descricao = $this->receita->getDescricao();
        $data = $this->receita->getData();
        $categoria = $this->receita->getCategoria();

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':valor', $valor);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':data', $data);
        $stmt->bindParam(':categoria', $categoria);

        return $stmt->execute();
    }

}
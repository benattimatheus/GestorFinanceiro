<?php

class DespesaModel
{
    private Despesa $despesa;

    public function __construct(Despesa $despesa){
        $this->despesa = $despesa;
    }

    public function save()
    {
        $stmt = Database::getConn()->prepare('INSERT INTO despesas (id, valor, descricao, datas, categoria)
        VALUES (:id, :valor, :descricao, :datas, :categoria)'); 

        $id = $this->despesa->getID();
        $valor = $this->despesa->getValor();
        $descricao = $this->despesa->getDescricao();
        $datas = $this->despesa->getData();
        $categoria = $this->despesa->getCategoria();

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':valor', $valor);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':datas', $datas);
        $stmt->bindParam(':categoria', $categoria);

        return $stmt->execute();
    }

}
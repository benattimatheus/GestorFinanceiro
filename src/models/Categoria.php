<?php

// require '../database/Database.php';

class Categoria
{
    private int $id;
    private int $tipo;
    private string $categoria;

    public function __construct(
        int $id,
        int $tipo,
        string $categoria
    ){
        $this->id = $id;
        $this->tipo = $tipo;
        $this->categoria = $categoria;
    }

    public function getID(): int
    {
        return $this->id;
    }

    public function getTipo(): float
    {
        return $this->tipo;
    }
    public function getCategoria(): string
    {
        return $this->categoria;
    }


}
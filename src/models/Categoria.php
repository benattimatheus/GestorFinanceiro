<?php

// require '../database/Database.php';

class Categoria
{
    
    private int $tipo;
    private string $categoria;

    public function __construct(
        
        int $tipo,
        string $categoria
    ){
        
        $this->tipo = $tipo;
        $this->categoria = $categoria;
    }


    public function getTipo(): float
    {
        return $this->tipo;
    }

    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    public function getCategoria(): string
    {
        return $this->categoria;
    }

    public function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

}
<?php

require_once __DIR__ . '/../database/Database.php';
    function teste()
    {        
        $stmt = Database::getConn()->prepare('SELECT * FROM categoria;');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

print_r(teste()); 
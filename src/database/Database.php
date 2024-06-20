<?php

class Database
{
    private static $conn;

    private function __construct()
    {
        if (is_null(self::$conn)) {
            self::$conn = new PDO(dsn: 'sqlite:../database/Financas.db', options:[
                PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,   
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
        }
    }

    public static function getConn()
    {
        if (is_null(self::$conn)) {
            new self;
        }
        return self::$conn;
    }
}

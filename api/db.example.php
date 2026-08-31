<?php

$host = "localhost";
$dbName = "learning_hub_db";
$dbUser = "root";
$dbPasswd = "";

try
{
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPasswd
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $error)
{
    die("Database connection failed.");
}

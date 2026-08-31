<?php 
session_start(); 
header("Content-Type:application/json;  charset=utf-8");

if(isset($_SESSION["user_id"]))
    {
        echo json_encode([
            "loggedIn" => true,
            "role" => $_SESSION["role"],
            "username"=> $_SESSION["username"]
        ]); 

        exit; 
    }

else
    {
        echo json_encode
        ([
            "loggedIn" => false]);
    }


?>
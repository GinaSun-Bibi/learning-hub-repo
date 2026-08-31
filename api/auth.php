<?php 

function requireTeacher()
{

if(!isset($_SESSION["user_id"]))
    {
        http_response_code(401); 

        echo json_encode([
            "success" => false,
            "message" => "please log in!"
        ]); 

        exit;
    }


if(!isset($_SESSION["role"]) || $_SESSION["role"]!=="teacher")
    {
        http_response_code(403); 

        echo json_encode([
            "success" => false, 
            "message" => "Teacher permission required!"
        ]); 

        exit; 
    }
}












?>
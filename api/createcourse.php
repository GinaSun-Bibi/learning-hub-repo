<?php 
session_start(); 



header("Content-Type: application/json; charset=utf-8");

require_once"db.php"; 
require_once"auth.php";

requireTeacher(); 

$data=json_decode(file_get_contents("php://input"),true)??[]; 

$courseName= trim($data["course name"]??""); 
$courseDescription = trim($data["course description"]??""); 
$userId=$_SESSION["user_id"]??"";


if($courseName ==="")
    {
        echo json_encode([

            "success" => false,
            "message" => "empty name!"

        ]); 

        exit; 
    }

try
{
$sql="INSERT INTO course_stat (course_name, course_description, user_id) VALUES (:course_name, :course_description, :user_id)";

$statement= $pdo -> prepare($sql); 

$statement -> execute(["course_name" =>$courseName,
                      "course_description" => $courseDescription,
                      "user_id" => $userId]); 


echo json_encode([
    "success" => true,
    "message" => "course created successfully!"
]);

}

catch (PDOException $error)
{
    echo json_encode([
        "success" => false,
        "message" => $error->getMessage()
    ]); 
}












?>
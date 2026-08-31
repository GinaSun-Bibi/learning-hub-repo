<?php 



header("Content-Type: application/json; charset=utf-8"); 

require_once"db.php";



$courseId = $_GET["course_id"]??"";

if(!is_numeric($courseId))
    {
    echo json_encode([
        "success" => false,
        "message" => "invalid course id"
    ]);

    exit;
}

try
{$sql = "SELECT * FROM upload_stat WHERE course_id= :course_id"; 

$statement= $pdo-> prepare($sql); 

$statement-> execute([":course_id" => $courseId]); 

$uploads= $statement -> fetchAll(PDO::FETCH_ASSOC); 

echo json_encode([
    "success" => true,
    "uploads" => $uploads
]);


}
catch(PDOException $error)
{
    echo json_encode([
        "success" => false,
        "message" => "could not find uploads"
    ]); 
}







?>
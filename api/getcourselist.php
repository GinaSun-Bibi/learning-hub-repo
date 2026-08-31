<?php 

header("Content-Type: application/json; charset=utf-8");

require_once"db.php"; 

try
{
    $sql="SELECT * FROM course_stat"; 

    $statement=$pdo -> prepare($sql); 

    $statement -> execute(); 

    $courseList= $statement ->fetchAll(PDO::FETCH_ASSOC); 

    echo json_encode([

        "success" => true, 
        "courses" => $courseList


    ]); 
}

catch(PDOException $error)
{
    echo json_encode([

        "success" => false,
        "message" => "Course List Fetched Unsuccessfully!"


    ]); 
}













?>
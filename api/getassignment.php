<?php 

header("Content-Type:application/json; charset=utf-8"); 
require_once"db.php"; 

try{

$courseId= $_GET["course_id"]; 

$sql="SELECT * FROM assignment_stat WHERE course_id= :course_id"; 

$statement= $pdo->prepare($sql);

$statement->execute([

 "course_id" => $courseId


]);

$assignments= $statement->fetchALL(PDO::FETCH_ASSOC); 

echo json_encode([

    "success" => true, 
    "assignments" => $assignments
]); 


}

catch(PDOException $error)
{
    echo json_encode([
        "success" => false,
        "message" => "Assignments cannot be fetched!"
    ]); 
}


?>
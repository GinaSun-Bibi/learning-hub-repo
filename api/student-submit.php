<?php 
session_start();

header("Content-Type: application/json; charset=utf-8");

require_once"db.php"; 

$submitName = $_POST["submit_name"]??""; 
$assignmentId= $_POST["assignment_id"]??"";
$userId=$_SESSION["user_id"]??"";

if(!isset($_FILES["submit_upload"])|| $_FILES["submit_upload"]["error"]!== UPLOAD_ERR_OK)
{
    echo json_encode([
        "success" => false,
        "message" => "Please upload a file!"
    ]); 

    exit; 
}

$uploadedAssignment = $_FILES["submit_upload"]; 
$originalAssignmentName = $uploadedAssignment["name"]; 

$uploadedAssignmentDir = "../submits/"; 

if (!is_dir($uploadedAssignmentDir))
    {
        mkdir($uploadedAssignmentDir, 0755, true); 
    }


$submitExtension = pathinfo($originalAssignmentName,PATHINFO_EXTENSION); 

$newSumitAssignmentName = uniqid("assignment_").".".$submitExtension; 


$detination = $uploadedAssignmentDir.$newSumitAssignmentName; 
$tmpPath = $uploadedAssignment["tmp_name"]; 

if(!move_uploaded_file($tmpPath, $detination))
    {
        echo json_encode([
            "success" => false, 
            "message" => "could not save the file! Please try again!"
        ]); 

        exit; 
    }




$sql = "INSERT INTO submit_stat(assignment_name_submit, submit_path, assignment_id, user_id) VALUES(:assignment_name_submit, :submit_path, :assignment_id, :user_id)"; 

$statement = $pdo-> prepare($sql); 

$statement -> execute([


"assignment_name_submit" => $submitName, 
"submit_path" => "submits/" . $newSumitAssignmentName,
"assignment_id" => $assignmentId,
"user_id" => $userId

]);


echo json_encode([
    "success" => true,
    "message" => "uploaded successfully!"
]);




?>
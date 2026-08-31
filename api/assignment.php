<?php 

session_start();

header("Content-Type: application/json; charset=utf-8"); 

require_once "db.php"; 
require_once "auth.php"; 

requireTeacher(); 

$courseId= $_POST["course_id"]??""; 
$assignmentName=trim($_POST["assignment_name"]??"");
$assignmentDescription=trim($_POST["assignment_description"]??""); 
$userId=$_SESSION["user_id"]; 

if($courseId===""||!is_numeric($courseId))
    {
        echo json_encode
        ([
            "success" => false,
            "message" => "Invalid course ID!"
        ]); 
        exit; 

    }

if($assignmentName ==="")
    {
        echo json_encode([

            "success" => false,
            "message" => "Assignment Name CANNOT be empty!"


        ]); 
        exit;

    }

if(!isset($_FILES["assignment_file"])|| $_FILES["assignment_file"]["error"]!==UPLOAD_ERR_OK)
    {
        echo json_encode([
            "success" => false,
            "message"=> "please upload the assignment file!"
        ]); 

        exit;
    }

$uploadedAssignment = $_FILES["assignment_file"]; 
$originalAssignmentName= $uploadedAssignment["name"]; 

$uploadedAssignmentDirectory = "../assignment-uploads/"; 

if(!is_dir($uploadedAssignmentDirectory))
    {
        mkdir($uploadedAssignmentDirectory,0755, true);
    }


$fileExtension=pathinfo($originalAssignmentName, PATHINFO_EXTENSION);
$newAssignmentName=uniqid("file_").".".$fileExtension;
$destinationPath=$uploadedAssignmentDirectory.$newAssignmentName;

$tmpPath=$uploadedAssignment["tmp_name"];

if(!move_uploaded_file($tmpPath,$destinationPath))
    {
        echo json_encode([

            "success"=> false,
            "message" => "Cannot save the uploaded file!"

        ]); 

        exit;
    }


$sql="INSERT INTO assignment_stat(user_id, course_id, assignment_name,assignment_description, original_assignment_name, assignment_path)
VALUES(:user_id, :course_id, :assignment_name,:assignment_description, :original_assignment_name, :assignment_path)";

$statement = $pdo ->prepare($sql); 

$statement -> execute([

":user_id" => $userId,
":course_id" => $courseId,
":assignment_name" => $assignmentName,
":assignment_description" => $assignmentDescription, 
":original_assignment_name" => $originalAssignmentName, 
":assignment_path" => "assignment-uploads/".$newAssignmentName

]);


echo json_encode([


"success" =>true,
"message"=>"Uploaded Successfully!"



]); 

?>
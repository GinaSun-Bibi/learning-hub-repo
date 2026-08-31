<?php 

session_start(); 



header("Content-Type: application/json; charset=utf-8");

require_once "db.php"; 
require_once "auth.php"; 

requireTeacher(); 

$courseId=$_POST["course_id"]??"";
$fileName=trim($_POST["file_name"]??""); 
$fileDescription=trim($_POST["file_description"]??""); 
$userId=$_SESSION["user_id"];

if($courseId ==="" ||!is_numeric($courseId))
    {
        echo json_encode([
            "success" => false,
            "message" => "Invalid course ID!"
        ]); 

        exit;
    }

if($fileName ==="")
{
    echo json_encode([
    "success" => false,
    "message"=> "please enter a file name"
    ]); 

    exit; 
}

if(!isset($_FILES["uploaded_file"]) || $_FILES["uploaded_file"]["error"] !==UPLOAD_ERR_OK)
    {
        echo json_encode([
        "success" => false,
        "message"=> "please upload a file"
        ]);

        exit;
    }


$uploadedFile = $_FILES["uploaded_file"]; 

$orginalFileName=$uploadedFile["name"];



$uploadDirectory="../uploads/";

if(!is_dir($uploadDirectory))
    {
        mkdir($uploadDirectory,0755, true); 
    }


$fileExtension = pathinfo($orginalFileName, PATHINFO_EXTENSION); 



$newFileName=uniqid("file_").".".$fileExtension; 


$destinationPath=$uploadDirectory.$newFileName;

$tmpPath=$uploadedFile["tmp_name"];

if(!move_uploaded_file($tmpPath,$destinationPath))
{
    echo json_encode([
        "success"=> false,
        "message" => "Cannot save the uploaded file!"]); 

        exit;
}

$sql="INSERT INTO upload_stat(user_id, course_id, file_name, file_description, original_file_name, file_path)
VALUES(:user_id, :course_id,:file_name, :file_description, :original_file_name, :file_path)";

$statement= $pdo ->prepare($sql); 

$statement->execute([
":user_id" => $userId,
":course_id" => $courseId,
":file_name" =>$fileName, 
":file_description" => $fileDescription,
":original_file_name" => $orginalFileName, 
":file_path" => "uploads/". $newFileName


]);

echo json_encode([
"success" =>true,
"message"=>"Uploaded Successfully!"


]);



?>
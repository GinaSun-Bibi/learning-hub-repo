<?php 
session_start(); 

header("Content-Type: application/json; charset=utf-8");

require_once"db.php";
$data = json_decode(file_get_contents("php://input"), true);

$username=trim($data["username"]??""); 
$password=$data["password"]??"";



if($username==="")
    {
    echo json_encode([
        "success" => false,
        "message" => "please enter your user name!"
    ]); 
    exit; 
}

if ($password==="")
    {
        echo json_encode([
            "success" => false, 
            "message" => "please enter your password!"
        ]);

        exit;
    }



$sql="SELECT * FROM user_login WHERE username=:username"; 

$statement = $pdo->prepare($sql); 

$statement->execute([":username" => $username]); 

$user=$statement -> fetch(PDO::FETCH_ASSOC);

if(!$user){
echo json_encode([

    "success" => false, 
    "message" => "Incorrect username or password!"
]); 
exit; 

}

if(!password_verify($password, $user["password_hash"]))
    {
        echo json_encode([
            "success" => false, 
            "message" => "Incorrect username or password!"
        ]); 

        exit; 
    }


$_SESSION["user_id"] = $user["id"]; 
$_SESSION["username"] = $user["username"]; 
$_SESSION["role"]=$user["role"];

echo json_encode([
    "success" => true, 
    "message" => "Login successfully!"
]); 







?>
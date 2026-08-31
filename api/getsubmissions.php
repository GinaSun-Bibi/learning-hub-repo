<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

require_once "db.php";
require_once "auth.php";

requireTeacher();

$assignmentId = $_GET["assignment_id"] ?? "";

if ($assignmentId === "" || !is_numeric($assignmentId))
{
    echo json_encode([
        "success" => false,
        "message" => "Invalid assignment ID!"
    ]);

    exit;
}

try
{
    $sql = "
        SELECT
            submit_stat.id,
            submit_stat.assignment_name_submit,
            submit_stat.submit_path,
            submit_stat.assignment_id,
            submit_stat.user_id,
            user_login.username

        FROM submit_stat

        JOIN user_login
        ON submit_stat.user_id = user_login.id

        WHERE submit_stat.assignment_id = :assignment_id
    ";

    $statement = $pdo->prepare($sql);

    $statement->execute([
        "assignment_id" => $assignmentId
    ]);

    $submissions = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "submissions" => $submissions
    ]);
}

catch(PDOException $error)
{
    echo json_encode([
        "success" => false,
        "message" => "Submissions cannot be fetched!"
    ]);
}

?>
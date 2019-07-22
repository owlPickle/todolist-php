<?php
header('Content-Type: application/json; charset=utf-8');
include('../../db.php');

try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", $db['username'], $db['password']);
} catch (PDOException $e) {
    echo "Database connected failed.";
    exit;
}

$sql = 'UPDATE todos SET `order`=:order WHERE id=:id';
$statement = $pdo->prepare($sql);
foreach ($_POST[orderArr] as $key => $orderArr) {
    $statement->bindValue(':id', $orderArr['id'], PDO::PARAM_INT);
    $statement->bindValue(':order', $orderArr['order'], PDO::PARAM_INT);
    $result = $statement->execute();
}

if (!result) {
    echo 'error';
}

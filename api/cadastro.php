<?php

require_once '../config/database.php';
require_once '../config/header.php';

$data = json_decode(file_get_contents("php://input"));

$nome = $data->nome;
$senha = $data->senha;

if(!empty($nome) && !empty($senha)){
    $sql = "INSERT into usuarios (nome,senha) values ('$nome','$senha')";
    $res = $mysqli->query($sql);
    echo json_encode(["mensagem" => "Usuario adicionado"]);
} else{
    echo json_encode(["mensagem" => "Preencha todos os campos!"]);
}
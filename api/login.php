<?php

require_once '../config/database.php';
require_once '../config/header.php';

$data = json_decode(file_get_contents("php://input"));

$nome = $data->nome;
$senha = $data->senha;
if(!empty($nome) && !empty($senha)){
    $sql = "SELECT * from usuarios where nome = '$nome' and senha = '$senha'";
    $res = $mysqli->query($sql);
    $quantidade = $res->num_rows;
    if($quantidade == 1){
        $usuario = $res->fetch_assoc();
        echo json_encode(["mensagem" => "Login efetuado com sucesso!", 'id_usuario' => $usuario['id'], 'perfil' => $usuario['perfil']]);
    } else{
        echo json_encode(["mensagem" => "Usuario não encontrado!"]);
    }
} else {
    json_encode(["mensagem" => "Dados incompletos!"]);
}
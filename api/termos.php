<?php

require_once '../config/database.php';
require_once '../config/header.php';

$metodo = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));

switch ($metodo){
    case 'GET':
        $sql = "SELECT nome,descricao,exemplos,categoria from termos";
        $res = $mysqli->query($sql);
        $termos = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode(["mensagem" => "Busca Realizada!", "data" => $termos]);
        break;
    case 'POST':
        if(!empty($data->id_usuario) && !empty($data->nome) && !empty($data->descricao) && !empty($data->exemplo) &&!empty($data->categoria)){
            if($data->categoria == "Matematica" || $data->categoria == "Portugues"){
                $sql = "INSERT into termos (id_usuario,nome,descricao,exemplos,categoria) values ($data->id_usuario,'$data->nome','$data->descricao','$data->exemplo','$data->categoria')";
                $res = $mysqli->query($sql);
                echo json_encode(["mensagem" => "Termo Adicionado com sucesso!"]);
            } else{
                echo json_encode(["mensagem" => "Categoria invalida!"]);
            }
        } else{
            echo json_encode(["mensagem" => "Preencha todos os dados!"]);
        }
        break;
    case 'DELETE':
        if(!empty($data->id)){
            $sql = "DELETE from termos where id = $data->id";
            $res = $mysqli->query($sql);
            echo json_encode(["mensagem" => "Termo deletado com sucesso!"]);
        } else{
            echo json_encode(["mensagem" => "Preencha todos os dados!"]);
        }
        break;
}
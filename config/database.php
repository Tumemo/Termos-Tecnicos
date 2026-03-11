<?php

$host = "localhost";
$user = "root";
$pass= "";
$db = "termostecnicos";

$mysqli = new mysqli($host,$user,$pass,$db);

if($mysqli->error){
    die("Erro ao conectar ao banco!".$mysqli->error);
}
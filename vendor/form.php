<?php
$recepient = "myprod777@gmail.com";
$siteName = "YumWeek";
$mailFrom = "myprod.official@gmail.com";
$headers = "From: $mailFrom\r\nContent-type: text/html; charset=utf-8\r\n";
$pagetitle = "=?utf-8?B?".base64_encode("Заявка с сайта \"$siteName\"")."?=";

$name = $_POST["name"];
$phone = $_POST["phone"];
$message = "Имя: $name \nТелефон: $phone";



$success = mail($recepient, $pagetitle, $message, $headers);
echo $success;


?>
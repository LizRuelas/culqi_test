<?php
//ini_set('display_errors', 1);
//error_reporting(E_ALL);

$tokenRecep = $_POST['token'];

define("secret_key", "sk_test_MC8mbT7XkJ4qRi6n");

function createCharge($token){
  $data = json_encode([
      'amount' => '10000',
      'currency_code' => 'PEN',
      'email' => 'richard@culqi.com',
      'source_id' => $token
  ]);
  $url = "https://api.culqi.com/v2/charges";
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_HTTPHEADER,
      ['Content-Type: application/json',
  	'Authorization: Bearer ' . secret_key,
  	'User-Agent: php-curl']
  );
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($ch);

  curl_close($ch);

  echo json_encode($result);

  // if($charge) {
  //   echo $charge;
  // }
}
createCharge($tokenRecep);
?>

<?php

  date_default_timezone_set('Europe/Rome');
  require 'config.php';

  $connection = new MongoClient();
  $rsvpCollection = $connection->ricettafelicita->rsvp;
  $messagesCollection = $connection->ricettafelicita->messages;

  $now = date('Y-m-d H:i:s');
  $data = json_decode(file_get_contents('php://input'));
  $data->date = $now;

  $list = array();
  $carne = 0;
  $veggie = 0;
  $rsvp = $rsvpCollection->find();
  foreach ($rsvp as $doc) {
    $t = ($doc['presenza'] ? ($doc['menu'] == 'carne' ? '🍖 ' : '🍏 ') : '😢 ') . ucwords($doc['nome'] . ' ' . $doc['cognome']);
    $n = ucwords($doc["nome"] . ' ' . $doc["cognome"]);
    $list[$n] = $t;
    $doc['menu'] == 'carne' ? $carne++ : $veggie++;
  }
  $t = urlencode(implode("\n", $list));
  $data->text = $t;

  if (strtolower($data->message->text) === 'lista') {
    $url = 'https://api.telegram.org/bot' . BOT_ID . '/sendMessage?chat_id=' . $data->message->chat->id . '&text=' . $t;
    $data->url = $url;
  }

  if (strtolower($data->message->text) === 'totale') {
    $url = 'https://api.telegram.org/bot' . BOT_ID . '/sendMessage?chat_id=' . $data->message->chat->id . '&text=' . count($list);
    $data->url = $url;
  }

  if (strtolower($data->message->text) === 'carne') {
    $url = 'https://api.telegram.org/bot' . BOT_ID . '/sendMessage?chat_id=' . $data->message->chat->id . '&text=' . $carne;
    $data->url = $url;
  }

  if (strtolower($data->message->text) === 'veggie') {
    $url = 'https://api.telegram.org/bot' . BOT_ID . '/sendMessage?chat_id=' . $data->message->chat->id . '&text=' . $veggie;
    $data->url = $url;
  }

  $messagesCollection->insert($data);

  $curl = curl_init();
  curl_setopt_array($curl, array(
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_URL => $url
  ));
  $resp = curl_exec($curl);
  curl_close($curl);

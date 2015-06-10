<?php

  function isInList ($name = "", $lastname = "") {
    global $listCollection;
    return !!$listCollection->find(array(
      'nome' => $name,
      'cognome' => $lastname
    ))->count();
  }

  function areInList ($guests = array()) {
    foreach ($guests as $g) {
      if (isInList($g->nome, $g->cognome)) {
        return true;
      }
    }
    return false;
  }



  date_default_timezone_set('Europe/Rome');

  $response = array();
  $connection = new MongoClient();
  $rsvpCollection = $connection->ricettafelicita->rsvp;
  $listCollection = $connection->ricettafelicita->list;

  $now = date('Y-m-d H:i:s');
  $guests = json_decode($_POST['guests']);
  if (areInList($guests)) {
    foreach ($guests as $g) {
      $g->date = $now;
      $rsvpCollection->insert($g);
    }
    $response['status'] = 'ok';
    $response['message'] = 'Grazie per la conferma!';
    header("HTTP/1.1 200 OK");
    // TODO inviare mail
  } else {
    $response['status'] = 'ko';
    $response['message'] = 'Ci spiace ma il tuo nome non ci risulta tra gli invitati';
    header('HTTP/1.0 403 Forbidden');
  }

  echo json_encode($response);

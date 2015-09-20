<?php

date_default_timezone_set('Europe/Rome');

$response = array();
$connection = new MongoClient();
$uploadsCollection = $connection->ricettafelicita->uploads;

if(isset($_POST["submit"])) {
  $fname = '';

  if (isset($_FILES["photo"])) {
    $target_dir = dirname(__FILE__) . "/assets/images/uploads/";
    $fname = uniqid() . '.' . basename($_FILES["photo"]["name"]);
    $target_file = $target_dir . $fname;
  }
  $uploadOk = 1;
  // Check if image file is a actual image or fake image
  //     $check = getimagesize($_FILES["photo"]["tmp_name"]);
  //     if($check !== false) {
  //         echo "File is an image - " . $check["mime"] . ".";
  //         $uploadOk = 1;
  //     } else {
  //         echo "File is not an image.";
  //         $uploadOk = 0;
  //     }
  // }
  // Check if file already exists
  // if (file_exists($target_file)) {
  //     echo "Sorry, file already exists.";
  //     $uploadOk = 0;
  // }
  if ($_POST['codice'] != 'giko&vale') {
      header('HTTP/1.0 403 Forbidden');
      $uploadOk = 0;
  }
  // Check file size
  // if ($_FILES["photo"]["size"] > 500000) {
  //     echo "Sorry, your file is too large.";
  //     $uploadOk = 0;
  // }
  // Allow certain file formats
  // if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  // && $imageFileType != "gif" ) {
  //     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  //     $uploadOk = 0;
  // }
  // Check if $uploadOk is set to 0 by an error
  var_dump($uploadOk);
  if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else {
    if (isset($_FILES["photo"])) {
      if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
          echo "The file ". basename( $_FILES["photo"]["name"]). " has been uploaded.";

          //indicate the path and name for the new resized file
          $resizedFile = $target_dir . 'thumb.' . $fname;

          //call the function (when passing path to pic)
          include('smart_resize_image.function.php');
          smart_resize_image($target_file, null, 1000, 300, true, $resizedFile, false, false, 60);

      } else {
          echo "Sorry, there was an error uploading your file.";
      }
    }

    $uploadsCollection->insert(array(
      'text' => $_POST['text'],
      'date' => date('Y-m-d H:i:s'),
      'file' => $fname
    ));
  }

}

$ups = $uploadsCollection->find()->sort(array('date' => -1));
foreach ($ups as $up) {
  $response[] = ($up);
}
echo json_encode($response);

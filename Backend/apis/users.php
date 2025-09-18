<?php
  require_once '../database/connect.php';

  $users = $con->prepare("SELECT * FROM users");
  $users->execute();
  $users = $users->fetchAll(PDO::FETCH_ASSOC);  

  echo json_encode($users);

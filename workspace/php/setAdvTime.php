<?php

require_once("dbHelper.php");

// Store the values sent from the function setAdvHighTime into variables.
$name = ($_GET['name']);
$time = intval($_GET['time']);

// Insert the name and score values to the table. 
$query = "INSERT INTO score_time_adv(name, score) VALUES('$name', '$time')";

performQuery($query);
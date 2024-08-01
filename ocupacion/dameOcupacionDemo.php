<?php
// Set the content type to application/json
header('Content-Type: application/json');

// Define the JSON data
$data = [
    "MACH" => 1,
    "ING" => 2,
    "COMB" => 1,
    "CRAI" => 2,
    "MAT" => 0,
    "ARQ" => 1,
    "INF" => 0,
    "EDU" => 1,
    "DYCT" => 1,
    "ECO" => 3,
    "TYF" => 0,
    "PYF" => 1,
    "CS" => 1,
    "HUMSC" => 1,
    "HUMSA" => 0,
    "HUMSB" => 2,
    "HUMMA" => 3,
    "BA" => 0,
    "AGR" => 4,
    "POL" => 1
];

// Output the JSON data
echo json_encode($data);
?>
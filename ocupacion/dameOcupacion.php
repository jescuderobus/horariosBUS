<?php
// Set the content type to application/json
header('Content-Type: application/json');

// Define the JSON data
$data = [
    "MACH" => 0,
    "ING" => 0,
    "COMB" => 0,
    "CRAI" => 0,
    "MAT" => 0,
    "ARQ" => 0,
    "INF" => 0,
    "EDU" => 0,
    "DYCT" => 0,
    "ECO" => 0,
    "TYF" => 0,
    "PYF" => 0,
    "CS" => 0,
    "HUMSC" => 0,
    "HUMSA" => 0,
    "HUMSB" => 0,
    "HUMMA" => 0,
    "BA" => 0,
    "AGR" => 0,
    "POL" => 0
];

// Accedemos a la base de datos SQLite
$db = new SQLite3('ocupacion.sqlite');

// Realizamos una consulta a la base de datos para obtener los valores biblioteca-ocupación
// y actualizarlos en el objeto $data

$result = $db->query('SELECT biblioteca, ocupacion FROM reportes WHERE timestamp > strftime("%s", "now") - 3600');
while ($row = $result->fetchArray()) {
    $data[$row['biblioteca']] += $row['ocupacion'];
}



// Output the JSON data
echo json_encode($data);
?>
<?php
// Crear o abrir una base de datos SQLite
$db = new SQLite3('2024Ocupacion.sqlite');

// Crear una tabla llamada 'reportes'
$db->exec('
    CREATE TABLE IF NOT EXISTS reportes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        uvus TEXT NOT NULL,
        biblioteca TEXT NOT NULL,
        ocupacion INTEGER NOT NULL,
        timestamp INTEGER NOT NULL,
        hora_humana TEXT NOT NULL
    )
');

// Insertar un registro en la tabla 'reportes'
$ip = '192.168.1.1';
$uvus = 'user123';
$biblioteca = 'Library1';
$ocupacion = 50;
$timestamp = time();
$hora_humana = date('Y-m-d H:i:s', $timestamp);

$stmt = $db->prepare('
    INSERT INTO reportes (ip, uvus, biblioteca, ocupacion, timestamp, hora_humana)
    VALUES (:ip, :uvus, :biblioteca, :ocupacion, :timestamp, :hora_humana)
');
$stmt->bindValue(':ip', $ip, SQLITE3_TEXT);
$stmt->bindValue(':uvus', $uvus, SQLITE3_TEXT);
$stmt->bindValue(':biblioteca', $biblioteca, SQLITE3_TEXT);
$stmt->bindValue(':ocupacion', $ocupacion, SQLITE3_INTEGER);
$stmt->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
$stmt->bindValue(':hora_humana', $hora_humana, SQLITE3_TEXT);
$stmt->execute();

// Cerrar la conexión a la base de datos
$db->close();
?>
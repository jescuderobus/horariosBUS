<?php

// Crear o abrir una base de datos SQLite que solo tendra una entrada por biblioteca

$db1 = new SQLite3('ocupacion.sqlite');

// Crear una tabla llamada 'reportes'
$db1->exec('
    CREATE TABLE IF NOT EXISTS reportes (
        biblioteca TEXT NOT NULL,
        ocupacion INTEGER NOT NULL,
        timestamp INTEGER NOT NULL
    )
');

// Insertamos cada una de las bibliotecas en la BBDD
// ["MACH","ING", "COMB","CRAI","MAT","ARQ","INF","EDU","DYCT","ECO","TYF","PYF","CS","HUMSC","HUMSA","HUMSB","HUMMA","BA","AGR","POL"]
$bibliotecas = ["MACH","ING", "COMB","CRAI","MAT","ARQ","INF","EDU","DYCT","ECO","TYF","PYF","CS","HUMSC","HUMSA","HUMSB","HUMMA","BA","AGR","POL"];
foreach ($bibliotecas as $biblioteca) {
    $ocupacion = 0;
    $timestamp = time();
    $stmt = $db1->prepare('
        INSERT INTO reportes (biblioteca, ocupacion, timestamp)
        VALUES (:biblioteca, :ocupacion, :timestamp)
    ');
    $stmt->bindValue(':biblioteca', $biblioteca, SQLITE3_TEXT);
    $stmt->bindValue(':ocupacion', $ocupacion, SQLITE3_INTEGER);
    $stmt->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
    $stmt->execute();
}

$db1->close();

//--------------------------------------------


// Crear o abrir una base de datos SQLite
$db2 = new SQLite3('ocupacionTodo2024.sqlite');

// Crear una tabla llamada 'reportes'
$db2->exec('
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
$ip = '0.0.0.0';
$uvus = 'testing';
$biblioteca = 'TEST';
$ocupacion = 0;
$timestamp = time();
$hora_humana = date('Y-m-d H:i:s', $timestamp);

$stmt = $db2->prepare('
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
$db2->close();
?>
<?php

// Crear o abrir una base de datos SQLite
$db1 = new SQLite3('ocupacion.sqlite');

// Crear una tabla llamada 'reportes' si no existe
$db1->exec('
    CREATE TABLE IF NOT EXISTS reportes (
        biblioteca TEXT NOT NULL,
        ocupacion INTEGER NOT NULL,
        timestamp INTEGER NOT NULL
    )
');


// Crear o abrir una base de datos SQLite
$db2 = new SQLite3('ocupacionTodo2024.sqlite');

// Crear una tabla llamada 'reportes' si no existe
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

// Función para generar una IP aleatoria en el rango 192.168.1.XX
function generarIP() {
    return '192.168.1.' . rand(1, 254);
}

// Función para seleccionar un UVUS aleatorio
function generarUVUS() {
    $uvus = ['jescudero0', 'jescudero1', 'aoporto', 'lfagundo'];
    return $uvus[array_rand($uvus)];
}

// Función para seleccionar una biblioteca aleatoria
function generarBiblioteca() {
    $bibliotecas = ["MACH","ING", "COMB","CRAI","MAT","ARQ","INF","EDU","DYCT","ECO","TYF","PYF","CS","HUMSC","HUMSA","HUMSB","HUMMA","BA","AGR","POL"];
    return $bibliotecas[array_rand($bibliotecas)];
}

// Función para generar una ocupación aleatoria con más probabilidad de ser baja
function generarOcupacion() {
    $ocupaciones = [1, 1, 1, 2, 2, 3, 4]; // Más probabilidad para 1 y 2
    return $ocupaciones[array_rand($ocupaciones)];
}

// Insertar cinco registros en la tabla 'reportes'
for ($i = 0; $i < 5; $i++) {
    $ip = generarIP();
    $uvus = generarUVUS();
    $biblioteca = generarBiblioteca();
    $ocupacion = generarOcupacion();
    $timestamp = time();
    $hora_humana = date('Y-m-d H:i:s', $timestamp);

    $stmt1 = $db1->prepare('
         UPDATE reportes SET ocupacion = :ocupacion, timestamp = :timestamp WHERE biblioteca = :biblioteca
    ');
    $stmt1->bindValue(':biblioteca', $biblioteca, SQLITE3_TEXT);
    $stmt1->bindValue(':ocupacion', $ocupacion, SQLITE3_INTEGER);
    $stmt1->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
    $stmt1->execute();

    $stmt2 = $db2->prepare('
        INSERT INTO reportes (ip, uvus, biblioteca, ocupacion, timestamp, hora_humana)
        VALUES (:ip, :uvus, :biblioteca, :ocupacion, :timestamp, :hora_humana)
    ');
    $stmt2->bindValue(':ip', $ip, SQLITE3_TEXT);
    $stmt2->bindValue(':uvus', $uvus, SQLITE3_TEXT);
    $stmt2->bindValue(':biblioteca', $biblioteca, SQLITE3_TEXT);
    $stmt2->bindValue(':ocupacion', $ocupacion, SQLITE3_INTEGER);
    $stmt2->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
    $stmt2->bindValue(':hora_humana', $hora_humana, SQLITE3_TEXT);
    $stmt2->execute();
}

// Cerrar la conexión a la base de datos
$db1->close();
$db2->close();
?>
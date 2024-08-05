<?php

// Manejamos el objeto POST
// print_r($_POST);

// Configurar la zona horaria a la del servidor
date_default_timezone_set('Europe/Madrid');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ocupacion = $_POST['ocupacion'];
    $timestamp = time();
    $biblioteca = "HUMSC";

    try {
        $db1 = new SQLite3('../ocupacion.sqlite');
        $stmt1 = $db1->prepare('UPDATE reportes SET ocupacion = :ocupacion, timestamp = :timestamp WHERE biblioteca = :biblioteca ');
        if (!$stmt1) {
            throw new Exception($db1->lastErrorMsg());
        }
        $stmt1->bindValue(':ocupacion', $ocupacion, SQLITE3_INTEGER);
        $stmt1->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
        $stmt1->bindValue(':biblioteca', $biblioteca, SQLITE3_TEXT);
        $result = $stmt1->execute();
        if (!$result) {
            throw new Exception($stmt1->getSQL());
        }
        $db1->close();
        echo "Update successful.";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }



    try {
        $db2 = new SQLite3('../ocupacionTodo2024.sqlite');
        $stmt2 = $db2->prepare('INSERT INTO reportes (ip, uvus, biblioteca, ocupacion, timestamp, hora_humana) VALUES (:ip, :uvus, :biblioteca, :ocupacion, :timestamp, :hora_humana)');
        if (!$stmt2) {
            throw new Exception($db2->lastErrorMsg());
        }
        $stmt2->bindValue(':ip', $_POST['ip'], SQLITE3_TEXT);
        $stmt2->bindValue(':uvus', $_POST['uvus'], SQLITE3_TEXT);
        $stmt2->bindValue(':biblioteca', $biblioteca, SQLITE3_TEXT);
        $stmt2->bindValue(':ocupacion', $ocupacion, SQLITE3_INTEGER);
        $stmt2->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
        $stmt2->bindValue(':hora_humana', $_POST['hora_humana'], SQLITE3_TEXT);
        $result = $stmt2->execute();
        if (!$result) {
            throw new Exception($stmt2->getSQL());
        }
        $db2->close();
        echo "Insert successful.";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }

    /*
    echo json_encode(['status' => 'success']);
    exit;
    */

    // Reiniciamos el objeto "POST" para que no se envíe la información de nuevo
    $_POST = [];

    // Recargamos la página para que se actualice la información
    header('Location: HUMSC.php');
}
?>




<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="60">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de ocupación Biblioteca de Humanidades (Sala Central)</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/ocupacion.css">
    <link rel="stylesheet" href="../css/modal.css">
</head>

<body>
    <h1>Reporte de ocupación BUS</h1>
    <hr style="color: black;width: 80%;">
    <p>Hoy <span id="dia-hora"></span> deseo reportar la ocupación de la</p>
    <div style="font-size: 4em;">Biblioteca de Humanidades (Sala Central)</div>
    <form method="POST" action="">
        <input type="hidden" name="biblioteca" value="HUMSC">
        <input type="hidden" name="timestamp" value="<?php echo time(); ?>">
        <input type="hidden" name="hora_humana" value="<?php echo date('Y-m-d H:i:s', time()); ?>">
        <input type="hidden" name="ip" value="<?php echo $_SERVER['REMOTE_ADDR']; ?>">
        <input type="hidden" name="uvus" value="testing">

        <div class="botones">
            <div class="contenedor-boton">
                <button id="btnbaja" class="boton-grande" name="ocupacion" value="1">BAJA </button>
                menos del 33%
            </div>
            <div class="contenedor-boton">
                <button id="btnmedia" class="boton-grande" name="ocupacion" value="2">MEDIA</button>
                entre el 33% y el 66%
            </div>
            <div class="alta contenedor-boton">
                <button id="btnalta" class="boton-grande" name="ocupacion" value="3">ALTA</button>
                <span>más del 66% ó del 90%</span>
                <div class="muyalta">
                    <button id="btnmuyalta" class="boton-pequeno" name="ocupacion" value="4">MUY ALTA</button>
                </div>
            </div>
        </div>
    </form>
    <hr style="color: black;width: 80%;">
    <?php
    $lastOcupacion = "";
    $lastFecha = "";
    $timestamp = 0;
    $ocupacionTag = [
        "ocupación ---",
        "ocupación <span class='oBaja' title='menos del 33%'>B A J A</span>",
        "ocupación <span class='oMedia' title='entre 33% y 66%'>M E D I A</span>",
        "ocupación <span class='oAlta' title='más del 66%'>A L T A</span>",
        "ocupación <span class='oMAlta' title='más del 90%'>M U Y  ALTA</span>"
    ];
    // Ejecutamos una sentencia SQL para obtener la última ocupación reportada

    $db = new SQLite3('../ocupacion.sqlite');
    $result = $db->query('SELECT ocupacion, timestamp FROM reportes WHERE biblioteca = "HUMSC"');
    while ($row = $result->fetchArray()) {
        $lastOcupacion = $ocupacionTag[$row['ocupacion']];
        $lastFecha = date('Y-m-d H:i:s', $row['timestamp']);
        $timestamp = $row['timestamp'];
    }
    $db->close();



    // si el timestamp de la hora actual menos el timestamp de la última ocupación es mayor a 3600 segundos
    // se muestra un mensaje de que la última ocupación reportada fue hace más de una hora. 
    // Quiero mostrar ese mensaje en modal
    $showModal = (time() - $timestamp > 3600);

    ?>
    <p>La última información reportada fue <span id="last-ocupacion"><?php echo $lastOcupacion; ?></span> el <span id="last-fecha"><?php echo $lastFecha; ?></span></span></p>

    <script src="../js/muestraFecha.js"></script>


    <!-- Modal -->
    <div id="myModal" class="modal">

        <div class="modal-content">
            <span class="close">&times;</span>
            <span class="logo">
                <span style="background-color: green;color:green;padding: 0px 2px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="background-color: orange;color:orange;padding: 0px 2px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="background-color: red;color:red;padding: 0px 2px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <b><em>&nbsp;&nbsp;&nbsp;&nbsp;¡ A L E R T A !</em></b>
            </span>
            <p class="text-inside-modal-centrado">
                La última ocupación reportada fue hace más de una hora.</p>
            <p class="text-inside-modal-centrado">
                <img src="../images/time-stopwatch-watch-svgrepo-com.svg" width="20%" alt="reloj decorativo">
            </p>
        </div>
    </div>

    <script>
        // Mostrar el modal si la última ocupación reportada fue hace más de una hora
        <?php if ($showModal) : ?>
            document.getElementById('myModal').style.display = 'block';
        <?php endif; ?>

        // Obtener el elemento <span> que cierra el modal
        var span = document.getElementsByClassName("close")[0];

        // Cuando el usuario hace clic en <span> (x), cierra el modal
        span.onclick = function() {
            document.getElementById('myModal').style.display = "none";
        }

        // Cuando el usuario hace clic en cualquier lugar fuera del modal, cierra el modal
        window.onclick = function(event) {
            if (event.target == document.getElementById('myModal')) {
                document.getElementById('myModal').style.display = "none";
            }
        }
    </script>

</body>

</html>
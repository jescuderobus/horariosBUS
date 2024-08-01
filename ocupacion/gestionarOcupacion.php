<?php
session_start();

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === 'admin') {
        $_SESSION['loggedin'] = true;
    } else {
        $error = "Incorrect password!";
    }
}

// Redirect to login if not logged in
if (!isset($_SESSION['loggedin'])) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <h2>Login</h2>
        <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
        <form method="post">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <button type="submit">Login</button>
        </form>
    </body>
    </html>
    <?php
    exit;
}

// Handle library selection and form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['library'])) {
    $_SESSION['library'] = $_POST['library'];
    $_SESSION['literal1'] = $_POST['literal1'];
    $_SESSION['literal2'] = $_POST['literal2'];
    header('Location: gestionarOcupacion.php?step=3');
    exit;
}

// Handle button clicks to write to the database
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $db = new SQLite3('2024Ocupacion.sqlite');
    $stmt = $db->prepare('INSERT INTO ocupacion (library, action, timestamp) VALUES (:library, :action, :timestamp)');
    $stmt->bindValue(':library', $_SESSION['library'], SQLITE3_TEXT);
    $stmt->bindValue(':action', $_POST['action'], SQLITE3_TEXT);
    $stmt->bindValue(':timestamp', time(), SQLITE3_INTEGER);
    $stmt->execute();
    $db->close();
    echo "Action recorded!";
}

// Display the appropriate screen based on the step
$step = isset($_GET['step']) ? $_GET['step'] : 1;

if ($step == 1) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Select Library</title>
    </head>
    <body>
        <h2>Select Library</h2>
        <form method="post">
            <label for="library">Library:</label>
            <select id="library" name="library">
                <option value="Library1">Library1</option>
                <option value="Library2">Library2</option>
                <!-- Add more options as needed -->
            </select>
            <br>
            <label for="literal1">Literal 1:</label>
            <input type="text" id="literal1" name="literal1">
            <br>
            <label for="literal2">Literal 2:</label>
            <input type="text" id="literal2" name="literal2">
            <br>
            <button type="submit">Next</button>
        </form>
    </body>
    </html>
    <?php
} elseif ($step == 3) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Actions</title>
    </head>
    <body>
        <h2>Actions</h2>
        <form method="post">
            <button type="submit" name="action" value="Action1">Action 1</button>
            <button type="submit" name="action" value="Action2">Action 2</button>
            <button type="submit" name="action" value="Action3">Action 3</button>
            <button type="submit" name="action" value="Action4">Action 4</button>
        </form>
    </body>
    </html>
    <?php
}
?>
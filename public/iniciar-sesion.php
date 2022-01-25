<?php
require_once('php/accesos.php');
//Si ya dieron click en el boton de submit
$mensaje = isset($_GET['error']) ? "<p class='error'>La contrase&ntilde;a es incorrecta</p>": '';
?>
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scouting</title>
    <link rel="stylesheet" type="text/css" href="css/Reset.css">
    <link rel="stylesheet" type="text/css" href="css/general.css">
    <link rel="stylesheet" type="text/css" href="css/estilo-index.css">
    <link rel="icon" type="image/png" href="img/nautilus.png">
    <script src="js/seguridad-index.js" charset="utf-8" defer></script>
  </head>
  <body>
    <header>
      <div id="logo-header">
        <h2>Scouting</h2>
        <img src="img/LogoHeader.png" alt="Nautilus 40 10">
      </div>
    </header>
    <section>
      <div class="login">
        <h1 class="login">SIGN IN</h1>
        <form action="php/iniciar-sesion.php" method="POST" onsubmit="return verificar()">
          <label for="pass" class="login">Contrase&ntilde;a:</label>
          <input type="password" name="contrasena" id="pass" placeholder="Contrase&ntilde;a" class="login">
          <p class="error ocultar" id="error-pass"></p>
          <?= $mensaje ?>
          <button type="submit" name="btn-submit" id="btn-submit" value="Log in">Log in</button>
        </form>
      </div>
    </section>
      
    <footer>
      <div class="centre firma flexbox">
        <a href="https://github.com/DiegoMont" class="firma">&lt;/&gt; with <span id="corazon" class="firma">&#9829;</span> by <span class="firma">DiegoMont</span></a>
      </div>
    </footer>
  </body>
</html>

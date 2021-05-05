<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apprendre un langage</title>
</head>

<body>
    <?php require 'component/menu.php'; ?>

    <?php

    if (!isset($_SESSION['pseudo'])) {

    ?>
        <section class="py-4 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-8 col-md-8 mx-auto">
                    <h1 class="fw-light">Apprendre en traduisant</h1>
                    <p class="lead text-muted">L'une des meilleurs manière d'apprendre son vocabulaire, c'est de tout simplement s'entraîner à le traduire. Notre outil permet d'apprendre en prenant compte de la liste de mots que vous voulez apprendre mais en plus une progression constante.</p>
                    <p>
                        <a href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); ?>#inscription" class="btn btn-primary my-2 inscription" onclick="loadSection(this)">Inscription</a>
                        <a href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); ?>#connexion" class="btn btn-secondary my-2 connexion" onclick="loadSection(this)">Connexion</a>
                    </p>
                </div>
            </div>
        </section>

    <?php

    }
    ?>

    <?php

    if (isset($_SESSION['pseudo'])) {

    ?>
        <section class="py-4 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-8 col-md-8 mx-auto">
                    <h1 class="fw-light">Apprendre une langue</h1>
                    <p class="lead text-muted">L'une des meilleures manière d'apprendre son vocabulaire, c'est de tout simplement s'entraîner à le traduire. Notre outil permet d'apprendre en prenant compte de la liste de mots que vous voulez apprendre mais en plus une progression constante.</p>
                </div>
            </div>
        </section>
    <?php

    }
    ?>
    <section id="content">
        <div class="album py-5 bg-light">
            <div class="container">
                <?php
                if (isset($_SESSION['pseudo'])) {
                ?>
                    <a href="pages/learn-by-translating.php" class="btn btn-primary btn-lg btn-block col-12">Accèder à notre outil !</a>
                <?php
                } else {
                ?><div class="alert alert-primary text-center" role="alert" style="margin:0">
                        Veuillez vous connecter pour accèder à notre outil
                    </div>
                <?php
                }
                ?>

            </div>
        </div>
    </section>

    <script src="sources/ajax.js"></script>
    <?php require 'component/link.php'; ?>

</body>

</html>
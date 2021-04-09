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
                    <h1 class="fw-light">Apprendre une langue</h1>
                    <p class="lead text-muted">Apprendre une langue contient un certains nombre d'outils pour vous aider dans votre apprentissage d'une langue. Il vous suffit simplement de créer un compte et de vous connecter pour profiter de l'ensemble de nos outils, et tout ça, gratuitement.</p>
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
                    <p class="lead text-muted">Apprendre une langue contient un certains nombre d'outils pour vous aider dans votre apprentissage d'une langue. </p>
                </div>
            </div>
        </section>
    <?php

    }
    ?>
    <section id="content">
        <div class="album py-5 bg-light">
            <div class="container">

                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div class="col">
                        <div class="card shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                            </svg>

                            <div class="card-body">
                                <h3 class="mb-2">Apprendre en traduisant</h3>
                                <p class="card-text">L'une des meilleurs manière d'apprendre son vocabulaire, c'est de tout simplement s'entraîner à le traduire. Notre outil permet d'apprendre en prenant compte de la liste de mots que vous voulez apprendre mais en plus une progression constante. </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="pages/learn-by-translating.php" type="button" class="btn btn-sm btn-outline-secondary">Apprendre</a>
                                    </div>
                                    <small class="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                            </svg>

                            <div class="card-body">
                                <h3 class="mb-2">Featured post</h3>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                    <small class="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                            </svg>

                            <div class="card-body">
                                <h3 class="mb-2">Featured post</h3>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                    <small class="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="sources/ajax.js"></script>
    <?php require 'component/link.php'; ?>

</body>

</html>
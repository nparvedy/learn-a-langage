<header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href=<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); ?>>Apprendre une langue</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="http://localhost/projet/learn-a-langage/">Accueil</a>
                    <?php
                    if (!isset($_SESSION['pseudo'])) {

                    ?>
                        <a class="nav-link inscription" href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); ?>#inscription" onclick="loadSection(this)">Inscription</a>
                        <a class="nav-link connexion" href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); ?>#connexion" onclick="loadSection(this)">Connexion</a>
                    <?php
                    } else {
                    ?>
                        <a class="nav-link connexion" href="app/logout.php">Deconnexion</a>
                    <?php

                    }
                    ?>
                    <!--<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
                </div>
            </div>
        </div>
    </nav>
</header>
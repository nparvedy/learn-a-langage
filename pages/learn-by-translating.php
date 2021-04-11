<?php
session_start();

require '../class/BDD.php';

$bdd = new BDD;

$allList = $bdd->getList($_SESSION['id']);

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apprendre une langue - Apprendre en traduisant</title>
</head>

<body>
    <?php require '../component/menu.php'; ?>

    <div class="col-lg-8 mx-auto p-3 py-md-5">
        <h1 class="d-flex align-items-center pb-3  border-bottom fs-3" style="font-weight:400;">Apprendre en traduisant</h1>
    </div>
    <div class="container mb-5">
        <div class="row align-items-md-stretch">
            <div class="col-md-6">
                <div class="h-100 p-4  border rounded-3">
                    <h2 class="mb-3">Charger votre liste</h2>
                    <form method="post" id="load-list">
                        <select class="form-select form-select-sm mb-3" aria-label=".form-select-sm example" name="list">
                            <option selected value="<?= $allList[0]['id'] ?>">Charger votre liste de mot</option>
                            <?php
                            for ($i = 0; $i < count($allList); $i++) {
                                echo "<option value=\"" . $allList[$i]['id'] . "\">" . $allList[$i]['list_name'] . "</option>";
                            }
                            ?>
                        </select>

                        <button class="btn btn-outline-secondary " type="submit">Charger</button>
                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="h-100 p-4 bg-light border rounded-3">
                    <h2 class="mb-3">Ajouter une nouvelle liste</h2>
                    <a href="<?= parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH); ?>#add" class="btn btn-primary my-2 add" onclick="loadSection(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <section id="content">

    </section>
    <script src="../sources/quizz.js"></script>
    <script src="../sources/ajax.js"></script>
    <script src="../sources/create-list.js"></script>
    <?php require '../component/link.php'; ?>
</body>

</html>
<?php

require '../class/BDD.php';

$bdd = new BDD;

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $_PUT = file_get_contents("php://input");
    $_PUT = json_decode($_PUT);
}

for ($i = 0; $i < count($_PUT); $i++) {
    $bdd->majQuizz($_PUT[$i]);
}
?>

<div class="container py-5 bg-light">
    <div class="container" id="container-quizz">
        <div class="alert alert-success" role="alert">
            Mise à jour réussi !
        </div>
    </div>
</div>
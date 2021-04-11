<?php
require '../class/BDD.php';

$bdd = new BDD;

$list_word = $bdd->getWordList($_POST['list']);

?>

<div class="container py-5 bg-light">
    <div class="container" id="container-quizz">
        <p>Vous avez bien chargé votre liste</p>
        <p>Pour démarrer le test, cliquer sur commencer</p>

        <button type="button" class="btn btn-primary" onclick='quizz.startQuizz(<?php echo json_encode($list_word); ?>)'>Commencer</button>
    </div>
</div>
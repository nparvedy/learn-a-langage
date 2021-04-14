<?php
require '../class/BDD.php';

$bdd = new BDD;

$list_word = $bdd->getWordList($_POST['list']);
$test = str_replace("'", '&#39;', json_encode($list_word));
$test = str_replace('"', '&quot;', $test);

?>

<div class="container py-5 bg-light">
    <div class="container" id="container-quizz">
        <p>Vous avez bien chargé votre liste</p>
        <p>Pour démarrer le test, cliquer sur commencer</p>

        <button type="button" class="btn btn-primary" onclick="quizz.startQuizz(<?php echo $test ?>)">Commencer</button>
    </div>
</div>
<?php
require '../class/BDD.php';

$bdd = new BDD;

$list_word = $bdd->getWordList($_POST['list']);
$test = str_replace("'", '&#39;', json_encode($list_word));
$test = str_replace('"', '&quot;', $test);

if (isset($_POST['timer'])) {
    $isTimer = true;
} else {
    $isTimer = false;
}
?>

<div class="container py-5 bg-light">
    <div class="container" id="container-quizz">
        <p>Vous avez bien chargé votre liste</p>
        <p>Pour démarrer le test, cliquer sur commencer</p>

        <button type="button" class="btn btn-primary" onclick="quizz.startQuizz(<?php echo $test ?>, <?= $isTimer ?>)">Commencer</button>
    </div>
</div>
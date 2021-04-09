<?php
session_start();

require '../class/BDD.php';

$bdd = new BDD;
$word = [];

if (isset($_POST['wordToTranslate-0']) && isset($_POST['wordTranslated-0']) && isset($_POST['listName'])) {
    if (!empty($_POST['wordToTranslate-0']) && !empty($_POST['wordTranslated-0']) && !empty($_POST['listName'])) {
        foreach ($_POST as $key => $value) {
            if ($key === 'listName') {
                $idList = $bdd->checkList($value);
                if ($idList === false) {
                    $bdd->addList($_SESSION['id'], $value);
                    $idList = $bdd->checkList($value);
                }
            } else if (strpos($key, 'wordToTranslate') !== false) {
                $word[0] = $value;
            } else if (strpos($key, 'wordTranslated') !== false) {
                $word[1] = $value;
            }

            if (count($word) == 2) {
                $bdd->addWord($idList['id'], $word[0], $word[1]);
                $word = [];
            }
        }
        header("Location: ../pages/learn-by-translating.php");
    } else {
        header("Location: ../pages/learn-by-translating.php");
    }
} else {
    header("Location: ../pages/learn-by-translating.php");
}

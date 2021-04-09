<?php

require '../class/BDD.php';

$bdd = new BDD;

if (isset($_POST['email']) && isset($_POST['password'])) {
    if (!empty($_POST['email']) && !empty($_POST['password'])) {
        $user = $bdd->checkUser($_POST['email']);
        if ($user != false) {
            $isPasswordCorrect = password_verify($_POST['password'], $user['password']);

            if ($isPasswordCorrect) {
                session_start();
                $_SESSION['id'] = $user['id'];
                $_SESSION['pseudo'] = $user['pseudo'];
                $_SESSION['email'] = $_POST['email'];

                header("Location: ../");
            } else {
                header("Location: ../?error=incorrectInformations#connexion");
            }
        } else {
            header("Location: ../?error=userNotFound#connexion");
        }
    } else {
        header("Location: ../?error=needMoreInformation#connexion");
    }
} else {
    header("Location: ../?error=needMoreInformation#connexion");
}

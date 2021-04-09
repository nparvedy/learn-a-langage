<?php

require '../class/BDD.php';

$bdd = new BDD;

if (isset($_POST['accountName']) && isset($_POST['email'])) {
    if (!empty($_POST['accountName']) && !empty($_POST['email'])) {
        if ($bdd->checkMail($_POST['email']) != false) {
            header("Location: ../?error=emailNotValid#inscription");
        } else if (isset($_POST['password']) && isset($_POST['passwordConfirmed'])) {
            if (!empty($_POST['password']) && !empty($_POST['passwordConfirmed'])) {
                if ($_POST['password'] === $_POST['passwordConfirmed']) {
                    $pass_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $bdd->addUser($_POST['accountName'], $_POST['email'], $pass_hash);
                    header("Location: ../");
                } else {
                    header("Location: ../?error=passwordNotSame#inscription");
                }
            } else {
                header("Location: ../?error=needMoreInformation#inscription");
            }
        } else {
            header("Location: ../?error=needMoreInformation#inscription");
        }
    } else {
        header("Location: ../?error=needMoreInformation#inscription");
    }
} else {
    header("Location: ../?error=needMoreInformation#inscription");
}

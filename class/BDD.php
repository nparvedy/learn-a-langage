<?php

class BDD
{
    private $pdo;

    public function __construct()
    {
        $this->connexion();
    }

    private function connexion()
    {
        try {
            $this->pdo = new PDO('mysql:host=localhost;dbname=learn_a_langage;charset=utf8', 'root', '');
        } catch (PDOException $e) {
            $this->pdo = 'Connexion échouée : ' . $e->getMessage();
        }
    }

    public function addUser($pseudo, $email, $password)
    {
        $req = $this->pdo->prepare('INSERT INTO users(pseudo, password, email, register_date) VALUES(:pseudo, :password, :email, NOW())');
        $req->execute([
            'pseudo' => $pseudo,
            'password' => $password,
            'email' => $email
        ]);
    }

    public function checkMail($email)
    {
        $req = $this->pdo->prepare('SELECT email FROM users WHERE email = :email');
        $req->execute([
            'email' => $email
        ]);

        return $req->fetch();
    }

    public function checkUser($email)
    {
        $req = $this->pdo->prepare('SELECT id, password, pseudo FROM users WHERE email = :email');
        $req->execute(array(
            'email' => $email
        ));

        return $req->fetch();
    }

    public function addList($userId, $listName)
    {
        $req = $this->pdo->prepare('INSERT INTO list(user_id, list_name) VALUES(:user_id, :list_name)');
        $req->execute([
            'user_id' => $userId,
            'list_name' => $listName
        ]);
    }

    public function checkList($list)
    {
        $req = $this->pdo->prepare('SELECT id FROM list WHERE list_name = :list_name');
        $req->execute(array(
            'list_name' => $list
        ));

        return $req->fetch();
    }

    public function addWord($listId, $wordToTranslate, $wordTranslated)
    {
        $req = $this->pdo->prepare('INSERT INTO list_word(list_id, word_to_translate, word_translated) VALUES(:list_id, :word_to_translate, :word_translated)');
        $req->execute([
            'list_id' => $listId,
            'word_to_translate' => $wordToTranslate,
            'word_translated' => $wordTranslated
        ]);
    }
}

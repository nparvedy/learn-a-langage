<?php
session_start();

require '../class/BDD.php';

$bdd = new BDD;

$allList = $bdd->getList($_SESSION['id']);

?>

<div class="h-100 p-4  border rounded-3">
    <h2 class="mb-3">Charger votre liste</h2>
    <form method="post" id="load-list-profil">
        <select class="form-select form-select-sm mb-3" aria-label=".form-select-sm example" name="list">
            <option selected value="<?= $allList[0]['id'] ?>">Charger votre liste de mot </option>
            <?php
            for ($i = 0; $i < count($allList); $i++) {
                echo "<option value=\"" . $allList[$i]['id'] . "\">" . $allList[$i]['list_name'] . "</option>";
            }
            ?>
        </select>

        <button class="btn btn-outline-secondary " type="submit">Charger</button>
    </form>
</div>
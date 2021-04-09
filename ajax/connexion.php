<div class="album py-5 bg-light">
    <div class="container">
        <legend>Formulaire de connexion</legend>
        <form action="app/connexionValidate.php" method="post">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Adresse mail</label>
                <input type="email" class="form-control" name="email" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" name="password" required>
            </div>
            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "incorrectInformations") {

            ?>
                    <div id="validationServer04Feedback" class="invalid-feedback mb-3" style="display:block">
                        Identifiants invalide
                    </div>
            <?php
                }
            }
            ?>

            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "needMoreInformation") {

            ?>
                    <div id="validationServer04Feedback" class="invalid-feedback mb-3" style="display:block">
                        Manque d'informations
                    </div>
            <?php
                }
            }
            ?>
            <button type="submit" class="btn btn-primary">Connexion</button>
        </form>
    </div>
</div>
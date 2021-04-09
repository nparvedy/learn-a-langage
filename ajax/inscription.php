<div class="album py-5 bg-light">
    <div class="container">
        <legend>Formulaire d'inscription</legend>
        <form action="app/registerValidate.php" method="post">

            <div class="mb-3">
                <label for="accountname" class="form-label">Nom de compte</label>
                <input type="text" class="form-control" name="accountName" required>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control <?php if (isset($_GET['error'])) {
                                                            if ($_GET['error'] == "emailNotValid") {
                                                                echo "is-invalid";
                                                            }
                                                        } ?>" name=" email" aria-describedby="emailHelp" required>
            </div>

            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "emailNotValid") {

            ?>
                    <div id="validationServer04Feedback" class="invalid-feedback" style="display:block">
                        L'adresse e-mail n'est pas disponible
                    </div>
            <?php
                }
            }
            ?>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Votre mot de passe</label>
                <input type="password" class="form-control" name="password" required>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirmer votre mot de passe</label>
                <input type="password" id="passwordConfirm" class="form-control <?php if (isset($_GET['error'])) {
                                                                                    if ($_GET['error'] == "passwordNotSame") {
                                                                                        echo "is-invalid";
                                                                                    }
                                                                                } ?>" name="passwordConfirmed" required>
            </div>
            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "passwordNotSame") {

            ?>
                    <div id="validationServer04Feedback" class="invalid-feedback" style="display:block">
                        Les mots de passes ne correspondent pas.
                    </div>
            <?php
                }
            }
            ?>

            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "needMoreInformation") {

            ?>
                    <div id="validationServer04Feedback" class="invalid-feedback" style="display:block">
                        Manque d'informations
                    </div>
            <?php
                }
            }
            ?>

            <button type="submit" class="btn btn-primary">Inscription</button>
        </form>
    </div>
</div>
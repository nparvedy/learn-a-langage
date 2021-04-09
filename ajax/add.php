<div class="container py-5 bg-light">
    <div class="container">
        <form action="../app/listValidate.php" method="post">
            <div class="mb-3 col-sm-6">
                <label for="" class="form-label">Nom de la liste</label>
                <input type="text" class="form-control" id="" name="listName">
            </div>
            <div class="row g-3 last">
                <div class="mb-3 col-sm-6">
                    <label for="" class="form-label">Mot à traduire</label>
                    <input type="text" class="form-control" id="" name="wordToTranslate-0">
                </div>
                <div class="mb-3 col-sm-6 ">
                    <label for="" class="form-label">Traduction</label>
                    <input type="text" class="form-control" id="" name="wordTranslated-0">
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Créer la liste</button>
            <button type="button" class="btn btn-primary my-2 add" onclick="addWord()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </button>

        </form>
    </div>
</div>
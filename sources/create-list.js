var compteur = 0;

function addWord() {
    compteur++;
    console.log(compteur);
    var last = document.querySelector(".last");
    var next = document.createElement("div");
    next.className = 'row g-3 last';
    next.innerHTML = '<div class="mb-3 col-sm-6">'
        + '<label for="" class="form-label">Mot à traduire</label>'
        + '<input type="text" class="form-control" id="" name="wordToTranslate-' + compteur + '">'
        + '</div >'
        + '<div class="mb-3 col-sm-6">'
        + '<label for="" class="form-label">Traduction</label>'
        + '<input type="text" class="form-control" id="" name="wordTranslated-' + compteur + '">'
        + '</div>'
    last.after(next);
    last.classList.remove('last');
}


//
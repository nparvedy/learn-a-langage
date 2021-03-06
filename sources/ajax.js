var httpRequest = new XMLHttpRequest();

var sectionContent = document.querySelector('#content');

function loadSection(button) {

    if (button == null) {
        return
    }

    var linkHref = button;

    if (typeof button != "string") {
        linkHref = button.hash;
        linkHref = linkHref.replace("#", '');
    }

    //sectionContent.innerHTML = "Chargement...";
    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            sectionContent.innerHTML = httpRequest.responseText;

        }
    };

    if (linkHref === '') {
        return
    }

    if (window.location.href.includes("pages")) {
        httpRequest.open('GET', '../ajax/' + linkHref + '.php', true);

    } else if (window.location.search.includes("?")) {
        httpRequest.open('GET', 'ajax/' + linkHref + '.php' + window.location.search, true);

    } else {
        httpRequest.open('GET', 'ajax/' + linkHref + '.php', true);
    }

    httpRequest.send();

    httpRequest.addEventListener('loadend', test);

}

//créer une autre page ajax pour gérer le profil ou mieux organiser pour éviter les conflits

function test() {
    var loadList = document.querySelector("#list-loaded");
    if (testForm == null) {
        var testForm = document.getElementById('load-list-profil');
        console.log(testForm);
        testForm.onsubmit = function (event) {
            event.preventDefault();

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    loadList.innerHTML = request.responseText;
                }
            };
            // POST to httpbin which returns the POST data as JSON
            request.open('POST', '../ajax/loadListProfil.php', /* async = */ true);

            var formData = new FormData(document.getElementById('load-list-profil'));
            request.send(formData);

            console.log(request.response);
        }
    }
}

window.addEventListener("load", function () {
    button = this.location.hash;
    button = button.replace("#", '');
    loadSection(button);

});

var testForm = document.getElementById('load-list');
if (testForm != null) {
    testForm.onsubmit = function (event) {
        event.preventDefault();

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                sectionContent.innerHTML = request.responseText;
            }
        };
        // POST to httpbin which returns the POST data as JSON
        request.open('POST', '../ajax/loadList.php', /* async = */ true);

        var formData = new FormData(document.getElementById('load-list'));
        request.send(formData);

        console.log(request.response);
    }
}

function compter() {
    var click = document.querySelector(".compter");
    click.innerHTML++;
}


httpRequest = new XMLHttpRequest();

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
}

window.addEventListener("load", function () {
    button = this.location.hash;
    button = button.replace("#", '');
    loadSection(button);


});

var testForm = document.getElementById('load-list');
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

function compter() {
    var click = document.querySelector(".compter");
    click.innerHTML++;
}


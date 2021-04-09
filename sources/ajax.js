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

    // buttonArray = button.split('?');
    // if (buttonArray.length >= 2) {
    //     button = buttonArray[0];
    //     error = buttonArray[1].replace("error=", "");
    // }

    // if (button != "") {
    //     var button = document.querySelector("." + button);

    //     loadSection(button);

    // }

    loadSection(button);


})

// function errorForm(error) {
//     if (error = "passwordNotSame") {
//         var passNotSame = document.querySelector('#passwordConfirm');
//     }
// }
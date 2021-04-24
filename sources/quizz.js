//todo : faire en sorte que les phrase qui contient les mots seul sortent à la suite (ex : "word" => "A great Word")
//todo : plus on se trompe sur certains mots dans une phrase et plus ils ont des chances d'apparaître pour aider
//todo : faire en sorte que les phrases dont les mots se ressemble à plus de chance d'apparaître
//todo : si une réponse est celui d'un autre mot, alors faire en sorte que ces deux mots apparaisse plus souvent /// si ça ne marche pas, alors faire en sorte qu'au début on entraine qu'un des deux, après on entraîne sur l'autre mot et après on entraine avec les deux en même temps
//todo : faire en sorte qu'une ne retombe pas plus que 2 fois d'affilé
//todo : avoir un historique des 5 derniers mot et si une erreur est provoqué après réussite, vérifié si deux mots n'est pas revenu deux fois et qui pourrait porter confusion à l'utilisateur !! vraiment important
//todo : lors d'une phrase, si l'utilisateur se trompe sur certains mot, plutôt que d'autres, alors faire en sorte que les indices sont ceux où il s'est trompé (concerne seulement les 5 mots du tableau pour limité au maximum)
//todo : Réduire à 3 mot/phrases quand il y en a 5 dans le tableau et faire en sorte qu'il ne peuvent pas retomber deux fois d'affilé
//todo : Si l'utilisateur met plus de 10 secondes pour valider le prochain mot alors il doit réaparaître au bout des 3 prochains mots
//todo : si la phrase à plus de 5 mots, alors les indices doivent être validés, exemple (un jour .. ....) ou (.. .... il pleut), tant que les deux ne sont pas validés alors il y aura toujours les indices.
//todo : récupérer les erreurs de mots d'une réponse, si il est complètement différent du mot de la réponse et si c'est le cas alors chercher si le mot existe  dans la liste, si c'est le cas alors l'afficher.

//todo : faire en sorte qu'à chaque nouvelle liste, les mots s'ajouté dans une liste entière de tous les mots de toutes les listes
//todo : pendant l'ajout d'un nouveau mot, si le même existe déjà alors sa traduction s'ajoute alors

//DONE : Ce n'est pas parce qu'on réussi du premier coup (100%) qu'il doit apparaitre aussi peu souvent, surtout avec l'aide. La validation doit se réussir sans aide. 
//DONE : faire en sorte que le mot seule sortent en premier et après les phrases
class Quizz {

    listWord;
    content;
    wordActual;
    lastWord;
    mytranslate;
    resultCheck = "";
    prioritizeWordBoard = [];
    reverse = false;
    time = 180;
    isTimer = false;
    goodAnswer = 0;
    wrongAnswer = 0;
    thereAreIndice = false;
    onlyWordList = [];
    onlyWordListReverse = [];
    onlyIdWord = "";

    prioritizeWordBoardNew = [];

    static HARDCORE = 20;
    static REALLY_HARD = 40;
    static HARD = 60;
    static MEDIUM = 80;
    static EASY = 100;

    startQuizz(listWord, timer = false) {
        this.listWord = listWord;
        this.setContent();
        this.addAllWord();
        this.next();

        if (timer) {
            this.isTimer = true;
            this.goodAnswer = 0;
            this.option();
            this.timer();
        }

    }

    addAllWord() {
        for (var i = 0; i < this.listWord.length; i++) {
            this.onlyWordList.push(this.listWord[i]['word_to_translate']);
        }

        for (var i = 0; i < this.listWord.length; i++) {
            this.onlyWordListReverse.push(this.listWord[i]['word_translated']);
        }
    }

    setContent() {
        this.content = document.querySelector('#container-quizz');
    }

    next() {
        if (this.mytranslate != null) {
            this.lastWord = this.wordActual;
            this.checkWord(this.mytranslate.value);

        }
        this.wordActual = this.selectWordNew();

        this.content.innerHTML = `
        <div class="row align-items-md-stretch">
            <div class="col-md-6">
                <div class="h-100 p-4  border rounded-3">
                    <p>Le mot à traduire est :  ${(this.reverse ? this.listWord[this.wordActual]['word_translated'] : this.listWord[this.wordActual]['word_to_translate'])}</p>
                    <div class="row g-3 last">
                        <div class="mb-3 col-sm-6 ">
                            <label for="" class="form-label">Traduction</label>
                            <input type="text" class="form-control" id="myTranslate" name="wordTranslated-0">
                        </div>
                    </div>
                    <p>${this.foundTheSentence()}</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="h-100 p-4 bg-light border rounded-3" id="result">
                    
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 mt-3 mb-3 d-sm-flex">
            <button type="button" class="btn btn-primary"  onclick="quizz.next()">Suivant</button>
            <button type="button" class="btn btn-danger" onclick="quizz.stop()">Stop</button>
            <button type="button" class="btn btn-info" onclick="quizz.reverseMethod()">Reverse</button>
        </div>
        `;

        this.mytranslate = document.querySelector("#myTranslate");
        this.event();
        this.mytranslate.focus();

        if (this.resultCheck != "") {
            this.result(this.resultCheck);
        } else {
            this.result();
        }


    }

    foundTheSentence() {
        // if (!this.reverse) {
        //     return "";
        // }

        var nbWord = 0;
        var averageWord = this.calculAverage(this.wordActual, this.reverse);

        //var sentence = this.listWord[this.wordActual]['word_to_translate'];
        var sentence = (this.reverse ? this.listWord[this.wordActual]['word_to_translate'] : this.listWord[this.wordActual]['word_translated']);

        var randomArray = [];

        if (averageWord <= Quizz.HARDCORE) {
            nbWord = 2;
        } else if (averageWord <= Quizz.REALLY_HARD) {
            nbWord = 1;
        }

        var sentenceArray = sentence.split(" ");

        //faut que la phrase est + de 2 mot
        if (sentenceArray.length == 1 || sentenceArray.length == 2) {
            nbWord = 0;
        }

        if (nbWord == 2 && sentenceArray.length > 4) {
            nbWord = 3;
        }

        if (nbWord != 0) {
            this.thereAreIndice = true;
        } else {
            this.thereAreIndice = false;
        }

        while (randomArray.length != nbWord) {
            var random = Math.floor(Math.random() * sentenceArray.length);
            if (!randomArray.includes(random)) {
                randomArray.push(random);
            }
        }

        sentence = "";

        for (var i = 0; i < sentenceArray.length; i++) {
            if (randomArray.includes(i)) {
                sentence = sentence + sentenceArray[i];
            } else {
                for (var a = 0; a < sentenceArray[i].length; a++) {
                    sentence = sentence + ".";
                }
            }
            sentence = sentence + " ";
        }

        return sentence;
    }

    event() {
        this.mytranslate.addEventListener("keydown", function (e) {
            if (e.code === "Enter") {
                next();
            }
        });
    }

    stop() {
        var data = JSON.stringify(this.listWord);

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '../ajax/majQuizz.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                sectionContent.innerHTML = xhr.responseText;
                setTimeout(function () {
                    window.location.href = ""; //will redirect to your blog page (an ex: blog.html)
                }, 1000);
            }
        };
        xhr.send(data);
    }

    reverseMethod() {
        if (this.reverse) {
            this.reverse = false;
        } else {
            this.reverse = true;
        }
        this.mytranslate = null;
        this.next();
    }

    SelectMinWordBoard() {
        var array = [];

        for (var i = 0; i < this.prioritizeWordBoardNew.length; i++) {
            array.push(this.calculAverage(this.prioritizeWordBoardNew[i], this.reverse));
        }

        var min = Math.min(...array);

        var key = this.arraySearch(array, min);

        return key;
    }

    arraySearch(arr, val) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] === val)
                return i;
        return false;
    }

    //Etape 1
    selectWordNew() {

        if (this.prioritizeWordBoardNew.length == 5) {
            var minKey = this.SelectMinWordBoard();

            var array = [];

            for (var i = 0; i < this.prioritizeWordBoardNew.length; i++) {
                if (minKey == i) {
                    for (var a = 0; a < 3; a++) {
                        array.push(i);
                    }
                } else {
                    array.push(i);
                }
            }

            array.sort(() => Math.random() - 0.5);

            const random = Math.floor(Math.random() * array.length);

            //faire en sorte que le score le plus bas apparaisse plus souvent et ainsi de suite


            return this.prioritizeWordBoardNew[array[random]];
        } else {
            return this.selectWord();
        }
    }

    //Si étape 1 n'a pas trouvé de mot, alors l'étape 2 prend la relève
    selectWord() {
        var arrayWord = [];
        for (var i = 0; i < this.listWord.length; i++) {
            this.calculSuccessRate(i);
            if (parseInt(this.listWord[i]['success_rate']) <= Quizz.HARDCORE || this.listWord[i]['word_validate'] == false) {
                var a = 0;
                while (a < Math.round(this.listWord.length)) {
                    arrayWord.push(i);
                    a++;
                }
            } else if (parseInt(this.listWord[i]['success_rate']) <= Quizz.REALLY_HARD) {
                var a = 0;
                while (a < Math.round(this.listWord.length / 3)) {
                    arrayWord.push(i);
                    a++;
                }
            } else if (parseInt(this.listWord[i]['success_rate']) <= Quizz.HARD) {
                var a = 0;
                while (a < 3) {
                    arrayWord.push(i);
                    a++;
                }
            } else if (parseInt(this.listWord[i]['success_rate']) <= Quizz.MEDIUM) {
                var a = 0;
                while (a < 2) {
                    arrayWord.push(i);
                    a++;
                }
            } else if (parseInt(this.listWord[i]['success_rate']) <= Quizz.EASY) {
                arrayWord.push(i);
            }

        }

        if (this.prioritizeWordBoard.length != 0) {
            var a = 0;
            while (a < this.listWord.length * this.prioritizeWordBoard[1]) {
                arrayWord.push(this.prioritizeWordBoard[0]);
                a++;
            }
        }

        arrayWord = arrayWord.sort(() => Math.random() - 0.5);

        const random = Math.floor(Math.random() * arrayWord.length);

        var value = (this.checkIsAnotherWord(arrayWord[random]) ? this.onlyIdWord : arrayWord[random]);

        return value;
    }

    checkIsAnotherWord(idWord) {
        //vérifier si la phrase n'est pas un mot
        var translateOrNot = (this.reverse ? "word_translated" : "word_to_translate");

        if (this.listWord[idWord][translateOrNot].trim().includes(" ")) {
            //if (this.listWord[idWord][translateOrNot].trim()) {
            //traiter la phrase et prendre qu'un mot
            var sentence = this.listWord[idWord][translateOrNot].trim().split(" ");
            for (var i = 0; i < sentence.length; i++) {

                //on copie le tableau sans ses propriété de l'attribut de la classe
                // var onlyWordListCopy = JSON.parse(JSON.stringify(this.onlyWordList))
                // onlyWordListCopy[idWord] = "";

                var idWordFound = this.findAWordInTheList(sentence[i]);

                //chercher si le mot est contenu ailleurs dans la liste hormis sa propre case
                if (idWordFound != false) {

                    // vérifier si le mot n'est pas à 0% de réussite

                    if (this.calculAverage(idWordFound, this.reverse) == 0) {
                        //si le mot à 0% alors on le retourne à la place de la phrase

                        this.onlyIdWord = idWordFound;

                        return true;
                    }

                }
            }
            //}
        }

        return false;

    }

    findAWordInTheList(val) {
        var list = (this.reverse ? this.onlyWordListReverse : this.onlyWordList);
        for (var i = 0; i < list.length; i++) {
            if (list[i] === val) {
                return i;

            }

        }

        return false;
    }

    addPrioritizeWord(idWord) {
        if (this.prioritizeWordBoard.length == 0) {

            this.prioritizeWordBoard = [idWord, 1];

        } else if (this.prioritizeWordBoard[0] == idWord) {

            this.prioritizeWordBoard[1] = 2;

        }
    }

    addPrioritizeWordNew(idWord) {
        if (this.prioritizeWordBoard.length == 0) {
            this.prioritizeWordBoardNew = [idWord];
        } else if (this.prioritizeWordBoardNew.length < 5) {
            if (!this.prioritizeWordBoardNew.includes(idWord)) {
                this.prioritizeWordBoardNew.push(idWord);
            }
        }

    }

    deleteWordPrioritizeNew(idWord) {
        if (this.prioritizeWordBoardNew.includes(idWord)) {

            if (this.calculAverage(idWord, this.reverse) > Quizz.HARD && this.listWord[idWord]['word_validate'] == true) {
                const index = this.prioritizeWordBoardNew.indexOf(idWord);
                if (index > - 1) {
                    this.prioritizeWordBoardNew.splice(index, 1);
                }
            }
        }

    }

    checkWord(WordTranslated) {

        if ((this.reverse ? this.listWord[this.wordActual]['word_to_translate'].toLowerCase().trim() : this.listWord[this.wordActual]['word_translated'].toLowerCase().trim()) == WordTranslated.toLowerCase().trim()) {
            (this.reverse ? this.listWord[this.wordActual]['right_counter_reverse']++ : this.listWord[this.wordActual]['right_counter']++);
            this.rightCounter++;
            this.resultCheck = "good";
            this.calculSuccessRate(this.wordActual);
            this.goodAnswer++;

            if (!this.thereAreIndice) {
                this.listWord[this.wordActual]['word_validate'] = true;
            }

            //Si on tombe sur le bon mot alors on réinitialise  
            if (this.prioritizeWordBoardNew != 0) {
                this.deleteWordPrioritizeNew(this.wordActual);
            }

            //Si on tombe sur le bon mot alors on réinitialise 
            if (this.prioritizeWordBoard != 0) {
                if (this.prioritizeWordBoard[0] == this.wordActual) {
                    this.prioritizeWordBoard = [];
                }
            }
        } else {
            (this.reverse ? this.listWord[this.wordActual]['wrong_counter_reverse']++ : this.listWord[this.wordActual]['wrong_counter']++);
            this.wrongAnswer++;
            this.resultCheck = "wrong";
            this.calculSuccessRate(this.wordActual);

            this.addPrioritizeWord(this.wordActual);
            this.addPrioritizeWordNew(this.wordActual);
        }
    }

    calculSuccessRate(i) {

        var moyenne = this.calculAverage(i, false);
        var moyenneReverse = this.calculAverage(i, true);

        this.listWord[i]['success_rate'] = (moyenne + moyenneReverse) / 2;
    }

    calculAverage(i, reverse) {
        var divide = (reverse ? (parseInt(this.listWord[i]['right_counter_reverse']) + parseInt(this.listWord[i]['wrong_counter_reverse'])) : (parseInt(this.listWord[i]['right_counter']) + parseInt(this.listWord[i]['wrong_counter'])));
        if (divide == 0) {
            divide = 1;
        }

        return (reverse ? this.listWord[i]['right_counter_reverse'] : this.listWord[i]['right_counter']) * 100 / divide;
    }

    result(result = "") {
        var resultObject = document.querySelector("#result");

        if (result == "") {
            resultObject.innerHTML = "";
        } else if (result == "good") {
            resultObject.innerHTML = `
                <h2>Résultat</h2>
                <div class="alert alert-success" role="alert">
                    Bravo le bon mot était bien : ${(this.reverse ? this.listWord[this.lastWord]['word_to_translate'] : this.listWord[this.lastWord]['word_translated'])}
                </div>
                <p>Vous avez ${this.goodAnswer} bon et ${this.wrongAnswer} faux.</p>
                `;
        } else if (result == "wrong") {
            resultObject.innerHTML = `
            <h2>Résultat</h2>
            <div class="alert alert-danger" role="alert">
                Et non ! La traduction était plutôt : ${(this.reverse ? this.listWord[this.lastWord]['word_to_translate'] : this.listWord[this.lastWord]['word_translated'])}
            </div>
            <p>Vous avez ${this.goodAnswer} bon et ${this.wrongAnswer} faux.</p>
            `
        }

        if (this.isTimer) {
            resultObject.innerHTML = resultObject.innerHTML + `
            <p>Vous avez ${this.goodAnswer} bonnes réponses et il vous en faut 20 pour terminer le quizz !</p>
            `
            if (this.goodAnswer == 20) {
                resultObject.innerHTML = `<div class="alert alert-success" role="alert">Bravo tu as réussi le test !</div>`;
                setInterval(function () {
                    quizz.stop();

                }, 2000)
            }
        }

    }

    timer() {

        var timeid = document.querySelector("#timer");
        setInterval(function () {
            var time = quizz.setTime();
            if (time <= 0) {
                timeid.innerHTML = "C'est terminé !";
                quizz.stop();
            } else {
                timeid.innerHTML = "Timer : " + time;
            }

        }, 1000)

    }

    setTime() {
        this.time = this.time - 1
        return this.time;
    }

    option() {
        var timer = document.createElement("div");
        timer.id = "timer";
        timer.style.position = "fixed";
        timer.style.left = "90%";
        timer.style.top = "50%";
        timer.classList.add("p-4", "border", "rounded-3");
        timer.innerHTML = "Timer : " + this.time;
        var content = document.querySelector('#content').appendChild(timer);
    }
}

var quizz = new Quizz;

function next() {
    quizz.next();
}


// function reverse() {
//     quizz.reverse();
// }

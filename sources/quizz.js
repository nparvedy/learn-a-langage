//todo : faire en sorte que les phrase qui contient les mots seul sortent à la suite (ex : "word" => "A great Word")
//todo : plus on se trompe sur certains mots dans une phrase et plus ils ont des chances d'apparaître pour aider
//todo : Réduire à 3 mot/phrases quand il y en a 5 dans le tableau et faire en sorte qu'il ne peuvent pas retomber deux fois d'affilé
//todo : Si l'utilisateur met plus de 10 secondes pour valider le prochain mot alors il doit réaparaître au bout des 3 prochains mots
//todo : récupérer les erreurs de mots d'une réponse, si il est complètement différent du mot de la réponse et si c'est le cas alors chercher si le mot existe  dans la liste, si c'est le cas alors l'afficher.
//todo : le nombre d'indice pourrait être déterminé par le nombres de mots, exemple (5 mot donc 4 indice), et si l'utilisateur réussit les mots alors que l'indice du mot n'est pas affiché alors c'est validé le mot. 

//todo : changer le système de sélection de mot par un système de poids par rapport au temps, et sucession de réussite ou erreurs.

//todo : faire en sorte que les phrases dont les mots se ressemble à plus de chance d'apparaître /!\
//todo : lors d'une phrase, si l'utilisateur se trompe sur certains mot, plutôt que d'autres, alors faire en sorte que les indices sont ceux où il s'est trompé (concerne seulement les 5 mots du tableau pour limité au maximum)/!\

//todo : faire en sorte que pendant le formulaire de liste de mot, on peut dire que cette phrase est une expression, il s'ajoutera comme indice pour prévenir à l'utilisateur que c'est expression et qu'il ne faut pas traduire mot à mot

//todo : faire en sorte qu'à chaque nouvelle liste, les mots s'ajouté dans une liste entière de tous les mots de toutes les listes
//todo : pendant l'ajout d'un nouveau mot, si le même existe déjà alors sa traduction s'ajoute alors
//todo : si tous les mots sont validés, alors la liste est validé.

//todo : l'utilisateur pourrait mettre une image pour lui donner un indice et trouver le mot, sans oublier préciser si c'est un verbre, adverbe, voire même une phrase d'indice comme par exemple la définition du mot dans la langue du mot. [Very important but later]

//DONE : Ce n'est pas parce qu'on réussi du premier coup (100%) qu'il doit apparaitre aussi peu souvent, surtout avec l'aide. La validation doit se réussir sans aide. 
//DONE : faire en sorte que le mot seule sortent en premier et après les phrases
//DONE : validation final sans les petits points pour aider
//DONE : a chaque bonne réponse, ne pas afficher un deuxième fois, 
//DONE : si la phrase à plus de 5 mots, alors les indices doivent être validés, exemple (un jour .. ....) ou (.. .... il pleut), tant que les deux ne sont pas validés alors il y aura toujours les indices. /!\
//DONE : Quand on donne la traduction d'un autre, au lieu que ça affiche 2 fois d'affilé l'un de l'autre, alors ça marche tout le temps et ça affiche simplement les deux mots jusqu'à validation des mot au moins 1 fois. MAIS faire en sorte que ça s'affiche au hasard, et un mot qui n'a rien à voir au dieu apparaît entre chacun de ses mots.
//DONE : faire en sorte que l'indice s'affiche seulement 3 secondes après. L'utilisateur malheuresement traduit par rapport à l'indice en premier et non par rapport au mot à traduire...
//DONE : si tu réussi une phrase, tu ne peux pas retomber une deuxième sur la même phrase/mot

//ALMOST DONE : une fois le mot traduit alors afficher là où il y a une erreur si il y en a (l'erreur ne s'affiche que si il y a une erreur à la fin du mot, faire en sorte que l'erreur peut être avant ou au milieu du mot) Si le mot "imprudent" on écrit "prudent", alors il faut repérer à quelle numéro de lettre et ajouter les lettres d'avant "im" + "prudent". [Manque plus qu'à vérifier pour tous les mots dans une phrase au lieu de seulement le dernier mot].

//CORRECTION : si une liste est déjà existante, elle ne prend pas en compte l'id de l'utilisateur mais seulement du nom de la liste donc faire en sorte que ça prend en compte l'ID de l'utilisateur.

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
    thereAreIndiceWord = false;
    thereAreIndiceWordReverse = false;
    onlyWordList = [];
    onlyWordListReverse = [];
    onlyIdWord = "";
    indicePart = false;
    lastAnswer = "";
    notThisTime = false;

    wrongWord = false;
    wrongWordArray = [];
    wrongWordValidate = [false, false];
    wrongWordValidateCount = [0, 0];
    wrongWordSelected;

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
        this.addNewProperties();
        this.next();

        if (timer) {
            this.isTimer = true;
            this.goodAnswer = 0;
            this.option();
            this.timer();
        }

    }

    addNewProperties() {
        this.listWord.forEach(element => {
            element.indicePartOne = false;
            element.indicePartTwo = false;
            element.indicePartOneReverse = false;
            element.indicePartTwoReverse = false;
            element.indiceChose = 0;
            element.indiceChoseReverse = 0;
            element.errorInARow = 0;
            element.rightInARow = 0;
            element.errorInARowReverse = 0;
            element.rightInARowReverse = 0;
        });

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
                            <input type="text" class="form-control" id="myTranslate" name="wordTranslated-0" autocomplete="off">
                        </div>
                    </div>
                    <p id="indice">${this.foundTheSentence()}</p>
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

        var validateWithoutWordIndice = (this.reverse ? "validate_without_word_indice_reverse" : "validate_without_word_indice");
        var sentenceArray = sentence.trim().split(" ");

        var indicePartOne = (this.reverse ? "indicePartOneReverse" : "indicePartOne");
        var indicePartTwo = (this.reverse ? "indicePartTwoReverse" : "indicePartTwo");

        if (sentenceArray.length > 1 && this.listWord[this.wordActual]['word_validate'] == false && (this.listWord[this.wordActual][indicePartOne] == false || this.listWord[this.wordActual][indicePartTwo] == false)) {
            this.showIndiceAfterSomeSecond(this.getSentenceIfPartInvalid(sentence, sentenceArray));

            return (sentence != "" ? "Indice en cours" : "");
            //return this.getSentenceIfPartInvalid(sentence, sentenceArray);
        }

        //faut que la phrase est + de 2 mot
        if (sentenceArray.length == 1 || sentenceArray.length == 2) {
            nbWord = 0;
        }

        if (nbWord == 2 && sentenceArray.length > 4) {
            nbWord = 3;
        }

        while (randomArray.length != nbWord) {
            var random = Math.floor(Math.random() * sentenceArray.length);
            if (!randomArray.includes(random)) {
                randomArray.push(random);
            }
        }

        sentence = "";

        if (this.listWord[this.wordActual][validateWithoutWordIndice] == false) {
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
        }

        if (nbWord != 0) {
            (this.reverse ? this.thereAreIndiceWordReverse = true : this.thereAreIndiceWord = true);
        } else {
            (this.reverse ? this.thereAreIndiceWordReverse = false : this.thereAreIndiceWord = false);
        }

        if (sentence != "") {
            this.thereAreIndice = true;
        } else {
            this.thereAreIndice = false;
        }

        this.showIndiceAfterSomeSecond(sentence);

        return (sentence != "" ? "Indice en cours" : "");
    }

    showIndiceAfterSomeSecond(sentence) {
        setTimeout(function () {
            var indice = document.querySelector("#indice");
            indice.innerText = sentence;
        }, 3000);
    }

    getSentenceIfPartInvalid(sentence, sentenceArray) {
        //divisé en 2 part la phrase

        var nbSentenceArray = sentenceArray.length;
        nbSentenceArray = Math.floor(nbSentenceArray / 2);

        //vérifié si les deux indices part sont faux, si l'indicePart déjà choisi alors le modifié pour choisir l'autre

        var indiceChose = (this.reverse ? "indiceChoseReverse" : "indiceChose")

        if (this.listWord[this.wordActual][indiceChose] == 0) {
            //si oui alors on sélectionne un des deux au hasard
            this.listWord[this.wordActual][indiceChose] = (Math.floor(Math.random() * 2) + 1);
        } else {
            if (this.listWord[this.wordActual][indiceChose] == 1) {
                this.listWord[this.wordActual][indiceChose] = 2;
            } else {
                this.listWord[this.wordActual][indiceChose] = 1;
            }
        }

        //retourner la sentence avec les indices et ...

        var sentence = "";

        //on affiche la première partie sinon la deuxième 

        var indiceChose = (this.reverse ? "indiceChoseReverse" : "indiceChose")

        if (this.listWord[this.wordActual][indiceChose] == 1) {
            for (var a = 0; a < nbSentenceArray; a++) {
                sentence = sentence + sentenceArray[a];
                sentence = sentence + " ";
            }

            for (var b = 0; b < sentenceArray.length - nbSentenceArray; b++) {
                sentence = sentence + " ";
                var nb = nbSentenceArray + b;
                for (var c = 0; c < sentenceArray[nb].length; c++) {
                    sentence = sentence + ".";
                }
            }
        } else {
            for (var d = 0; d < nbSentenceArray; d++) {
                for (var e = 0; e < sentenceArray[d].length; e++) {
                    sentence = sentence + ".";
                }

                sentence = sentence + " ";

            }

            for (var f = 0; f < sentenceArray.length - nbSentenceArray; f++) {
                var nb = nbSentenceArray + f;
                sentence = sentence + sentenceArray[nb];
                sentence = sentence + " ";
            }
        }
        sentence = sentence + " ";

        //n'oubliez pas de validé l'indice part et de changer la valeur en true

        this.thereAreIndice = true;
        (this.reverse ? this.thereAreIndiceWordReverse = true : this.thereAreIndiceWord = true);
        this.indicePart = true;

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

        if (this.wrongWord == true && this.notThisTime) {
            return this.wrongWordArray[this.wrongWordSelected];
        }

        console.log(this.prioritizeWordBoardNew);

        if (this.prioritizeWordBoardNew.length == 5) {
            var minKey = this.SelectMinWordBoard();

            //var array = [];
            var arrayWordWeight = [];

            for (var i = 0; i < this.prioritizeWordBoardNew.length; i++) {
                if (!this.checkIfWordDidntAppears(this.prioritizeWordBoardNew[i])) {
                    // if (minKey == i) {
                    //     for (var a = 0; a < 3; a++) {
                    //         array.push(i);
                    //     }
                    // } else {
                    //     array.push(i);
                    // }
                    arrayWordWeight.push({
                        id: this.prioritizeWordBoardNew[i], weight: this.listWord[i]['weight']
                    });
                }

            }

            // array.sort(() => Math.random() - 0.5);

            // const random = Math.floor(Math.random() * array.length);

            arrayWordWeight.sort((a, b) => (a.weight > b.weight ? 1 : - 1));

            const random = Math.floor(Math.random() * 3);

            return arrayWordWeight[random]['id'];

            //faire en sorte que le score le plus bas apparaisse plus souvent et ainsi de suite

            return this.prioritizeWordBoardNew[array[random]];
        } else {
            return this.selectWord();
        }
    }

    //Si étape 1 n'a pas trouvé de mot, alors l'étape 2 prend la relève
    selectWord() {
        //vérifié checkIfWordDidntAppears est vrai et si c'est vrai alors vérifié si c'est l'id dont il ne faut pas ajouter dans le tableau
        //var arrayWord = [];
        var arrayWordWeight = [];

        for (var i = 0; i < this.listWord.length; i++) {
            var check = false;

            if (this.lastWord != undefined) {
                if (this.lastWord == i) {
                    check = this.checkIfWordDidntAppears(i);
                }
            }
            this.calculSuccessRate(i);

            if (!check) {
                arrayWordWeight.push({ id: i, weight: this.listWord[i]['weight'] });
            }

            // var moyenne = this.calculAverage(i, this.reverse);
            //var weight = this.calculWeight(i);

            //au lieu de la moyenne pour choisir le mot, on utilisera finalement le poid du mot

            //Si le poid du mot vaut 0, alors on le renvoie directement
            // var weight = (this.reverse ? "weight_reverse" : "weight");
            // if (this.listWord[i][weight] == 0) {
            //     return i;
            // }

            //check si la date fait plus de 24H pour le mot, si c'est le cas alors faut refaire le calculWeight

            // if (!check) {
            //     if (parseInt(moyenne) <= Quizz.HARDCORE || this.listWord[i]['word_validate'] == false) {
            //         var a = 0;
            //         while (a < Math.round(this.listWord.length)) {
            //             arrayWord.push(i);
            //             a++;
            //         }
            //     } else if (parseInt(moyenne) <= Quizz.REALLY_HARD) {
            //         var a = 0;
            //         while (a < Math.round(this.listWord.length / 3)) {
            //             arrayWord.push(i);
            //             a++;
            //         }
            //     } else if (parseInt(moyenne) <= Quizz.HARD) {
            //         var a = 0;
            //         while (a < 3) {
            //             arrayWord.push(i);
            //             a++;
            //         }
            //     } else if (parseInt(moyenne) <= Quizz.MEDIUM) {
            //         var a = 0;
            //         while (a < 2) {
            //             arrayWord.push(i);
            //             a++;
            //         }
            //     } else if (parseInt(moyenne) <= Quizz.EASY) {
            //         arrayWord.push(i);
            //     }

            // }

        }

        arrayWordWeight.sort((a, b) => (a.weight > b.weight ? 1 : - 1));

        const random = Math.floor(Math.random() * 3);

        return arrayWordWeight[random]['id'];

        // if (this.prioritizeWordBoard.length != 0) {
        //     var a = 0;
        //     while (a < this.listWord.length * this.prioritizeWordBoard[1]) {
        //         arrayWord.push(this.prioritizeWordBoard[0]);
        //         a++;
        //     }
        // }

        //arrayWord = arrayWord.sort(() => Math.random() - 0.5);

        // const random = Math.floor(Math.random() * arrayWord.length);

        // var value = (this.checkIsAnotherWord(arrayWord[random]) ? this.onlyIdWord : arrayWord[random]);

        //return value;
    }

    calculWeight(i) {
        //X - (X - a / X);
        //nbErreur - (nbErreur - rightInArrow / nbErreur);
        //le poid retombe à 0 si la chaine de réussite est cassé, on ne veut pas de ça, faut prendre en compte le poid actuelle
        // nbErreur - (nbErreur - rightInArrow / nbErreur) + poidActuel / différenceErrorRight
        // nbErreur - (nbErreur - nbRightInARow / nbErreur) + poidActuel * (nbRight*nbRightInARow+1/(nbError*nbErrorInARow+1))
        // this.listWord[i][weight] = nbError - (nbError - nbRightInARow / nbError) + this.listWord[i][weight] * (nbRight * (nbRightInARow + 1) / (nbError * (nbErrorInARow + 1))); (pas bon)
        //1 - (1 - 0 / 1) + 0 * (0*(0+1) / (1*(1+1))

        var wrong = (this.reverse ? "wrong_counter_reverse" : "wrong_counter");
        var right = (this.reverse ? "right_counter_reverse" : "right_counter");
        var rightInARow = (this.reverse ? "rightInARowReverse" : "rightInARow");
        var errorInARow = (this.reverse ? "errorInARowReverse" : "errorInARow");
        var weight = (this.reverse ? "weight_reverse" : "weight");
        var nbError = this.listWord[i][wrong];
        var nbRight = this.listWord[i][right];
        var nbRightInARow = this.listWord[i][rightInARow];
        var nbErrorInARow = this.listWord[i][errorInARow];

        // console.log(nbError);
        // console.log(nbRightInARow);
        // console.log(this.listWord[i][weight]);
        // console.log(nbRight);
        // console.log(nbErrorInARow);

        var value = nbError - (nbError - nbRightInARow / (nbError + (nbError == 0 ? 1 : 0))) + (this.listWord[i][weight] * (nbRight * nbRightInARow + (nbRightInARow == 0 ? 1 : 0) / (nbError * nbErrorInARow + (nbErrorInARow == 0 ? 1 : 0))));

        value = value / (this.listWord[i][weight] + (this.listWord[i][weight] == 0 ? 1 : 0));
        this.listWord[i][weight] = Math.round(value * 100) / 100;
        //console.log(nbRight * nbRightInARow + 1 / (nbError * nbErrorInARow + 1)); - (nbRight - (nbRight - nbErrorInARow / (nbRight + 1)))
    }

    checkIsAnotherWord(idWord) {
        //vérifier si la phrase n'est pas un mot
        var translateOrNot = (this.reverse ? "word_translated" : "word_to_translate");

        if (this.listWord[idWord][translateOrNot].trim().includes(" ")) {
            //traiter la phrase et prendre qu'un mot
            var sentence = this.listWord[idWord][translateOrNot].trim().split(" ");
            for (var i = 0; i < sentence.length; i++) {

                //on copie le tableau sans ses propriété de l'attribut de la classe

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

    checkIfWordDidntAppears(idWord) {
        if (idWord == this.lastWord && this.resultCheck == "good") {
            return true;
        } else {
            return false;
        }
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
            var weight = (this.reverse ? "weight_reverse" : "weight")
            //if (this.calculAverage(idWord, this.reverse) > Quizz.HARD && this.listWord[idWord]['word_validate'] == true) {
            if (this.listWord[idWord][weight] > Quizz.HARD && this.listWord[idWord]['word_validate'] == true) {
                const index = this.prioritizeWordBoardNew.indexOf(idWord);
                if (index > - 1) {
                    this.prioritizeWordBoardNew.splice(index, 1);
                }
            }
        }

    }

    checkWord(WordTranslated) {
        this.lastAnswer = WordTranslated;


        if ((this.reverse ? this.listWord[this.wordActual]['word_to_translate'].toLowerCase().trim() : this.listWord[this.wordActual]['word_translated'].toLowerCase().trim()) == WordTranslated.toLowerCase().trim()) {
            (this.reverse ? this.listWord[this.wordActual]['right_counter_reverse']++ : this.listWord[this.wordActual]['right_counter']++);
            this.rightCounter++;
            this.resultCheck = "good";
            this.calculSuccessRate(this.wordActual);
            this.goodAnswer++;

            //on reset les erreurs d'affilé et on ajoute 1 à vrai d'affilé

            var rightInARow = (this.reverse ? "rightInARowReverse" : "rightInARow");
            var errorInARow = (this.reverse ? "errorInARowReverse" : "errorInARow");
            this.listWord[this.wordActual][errorInARow] = 0;
            this.listWord[this.wordActual][rightInARow]++;

            this.calculWeight(this.wordActual);

            if (this.wrongWord) {
                (this.notThisTime ? this.notThisTime = false : this.notThisTime = true);
                this.checkInWrongWordValidate();
            }

            var validateWithoutWordIndice = (this.reverse ? "validate_without_word_indice_reverse" : "validate_without_word_indice");

            if ((this.reverse ? this.thereAreIndiceWordReverse : this.thereAreIndiceWord) == false) {
                this.listWord[this.wordActual][validateWithoutWordIndice] = true;
            }

            if (this.indicePart == true) {
                this.validationIndicePart();
            }


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
            var validateWithoutWordIndice = (this.reverse ? "validate_without_word_indice_reverse" : "validate_without_word_indice");
            (this.reverse ? this.listWord[this.wordActual]['wrong_counter_reverse']++ : this.listWord[this.wordActual]['wrong_counter']++);
            this.wrongAnswer++;
            this.resultCheck = "wrong";

            var rightInARow = (this.reverse ? "rightInARowReverse" : "rightInARow");
            var errorInARow = (this.reverse ? "errorInARowReverse" : "errorInARow");
            this.listWord[this.wordActual][errorInARow]++;
            this.listWord[this.wordActual][rightInARow] = 0;

            this.calculWeight(this.wordActual);

            this.listWord[this.wordActual][validateWithoutWordIndice] = false;

            if (this.wrongWord) {
                (this.notThisTime ? this.notThisTime = false : this.notThisTime = true);
                if (this.notThisTime) {
                    this.changeWrongWordSelected();
                }
            }

            //on vérifie si le mot traduit n'est pas la traduction d'un autre mot
            if (this.wrongWord != true) {
                var ifWrongWord = this.ifTranslatingIsAnother(WordTranslated.toLowerCase().trim());
                if (ifWrongWord != false) {
                    this.wrongWord = true;
                    this.wrongWordArray = [ifWrongWord, this.wordActual];
                    this.wrongWordSelected = 0;
                }
            }

            this.calculSuccessRate(this.wordActual);

            this.addPrioritizeWord(this.wordActual);
            this.addPrioritizeWordNew(this.wordActual);
        }
    }

    checkInWrongWordValidate() {

        if (this.wrongWordValidateCount[this.wrongWordSelected] == 2) {
            if (!this.wrongWordValidate[this.wrongWordSelected]) {
                this.wrongWordValidate[this.wrongWordSelected] = true;
            }
        } else {
            this.wrongWordValidateCount[this.wrongWordSelected]++;
        }

        if (this.wrongWordValidate[0] == true && this.wrongWordValidate[1] == true) {

            //on reset tout
            this.wrongWord = false;

            this.wrongWordArray = [];
            this.wrongWordValidate = [false, false];
            this.wrongWordValidateCount = [0, 0];
        } else {
            this.changeWrongWordSelected();
        }
    }

    changeWrongWordSelected() {
        this.wrongWordSelected = Math.floor(Math.random() * 2);
    }

    ifTranslatingIsAnother(wordTranslated) {
        var reverse = (this.reverse ? "word_to_translate" : "word_translated");

        for (var i = 0; i < this.listWord.length; i++) {
            if (this.listWord[i][reverse] == wordTranslated) {
                return i;
            }
        }

        return false;
    }

    validationIndicePart() {
        if (this.reverse) {
            if (this.listWord[this.wordActual]['indiceChoseReverse'] == 1) {
                this.listWord[this.wordActual]['indicePartOneReverse'] = true;
            } else {
                this.listWord[this.wordActual]['indicePartTwoReverse'] = true;
            }
        } else {
            if (this.listWord[this.wordActual]['indiceChose'] == 1) {
                this.listWord[this.wordActual]['indicePartOne'] = true;
            } else {
                this.listWord[this.wordActual]['indicePartTwo'] = true;
            }
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
            <div class="alert alert-light" role="alert">
                ${this.checkWhatIsWrong()}
            </div>
            <div class="alert alert-primary" role="alert">
                ${(this.reverse ? this.listWord[this.lastWord]['word_translated'] : this.listWord[this.lastWord]['word_to_translate'])}
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

    checkWhatIsWrong() {
        var sentenceToTranslate = (this.reverse ? this.listWord[this.lastWord]['word_to_translate'] : this.listWord[this.lastWord]['word_translated']);
        sentenceToTranslate = sentenceToTranslate.toLowerCase();
        var answer = this.lastAnswer;
        answer = answer.toLowerCase();

        //savoir quel mots sont bons et ceux qui sont mauvais
        var sentenceArray = sentenceToTranslate.trim().split(" ");
        var answerArray = answer.trim().split(" ");

        var result = "";

        //renvoyer la phrase avec les bons mots en vert et ceux qui sont faux en rouge
        for (var i = 0; i < answerArray.length; i++) {
            if (answerArray.length == 1 && answerArray[0] == "") {
                return "Vous avez envoyez une réponse vide";
            }

            if (sentenceArray.includes(answerArray[i])) {
                result = result + `<span class="text-success">${answerArray[i]}</span>`;
            } else {
                //dans le mot mauvais, n'afficher que la partie mauvais en rouge

                var value = this.checkWhatIsWrongResult(i, answerArray, sentenceArray);

                if (value == false) {
                    result = result + `<span class="text-danger">${answerArray[i]}</span>`;
                } else {
                    result = result + value;
                }

            }

            result = result + " ";
        }

        return result;

        //si il manque une lettre dans le mot alors afficher la lettre qui manque en rouge
    }

    checkWhatIsWrongResult(i, answerArray, sentenceArray) {
        var result = false;
        var wordRecovery = "";

        for (var a = 0; a < sentenceArray.length; a++) {

            if (sentenceArray[a].includes(answerArray[i])) {
                //on vérifie la position des lettres
                var checkPosition = this.checkPositionCharacter(sentenceArray[a], answerArray[i]);

                //afficher le restes des lettres qui manque en jaune après le mot
                //si le check est false alors le reste du mot est avant, sinon après

                if (checkPosition[0]) {
                    result = `<span class="text-success">${answerArray[i]}</span>`;
                    for (var b = answerArray[i].length; b < sentenceArray[a].length; b++) {
                        result = result + `<span class="text-warning">${sentenceArray[a][b]}</span>`;
                    }
                } else {

                    //on récupère la partie avant
                    result = `<span class="text-warning">${sentenceArray[a].substring(0, checkPosition[1])}</span>`;

                    wordRecovery = sentenceArray[a].substring(0, checkPosition[1]);

                    result = result + `<span class="text-success">${answerArray[i]}</span>`;

                    wordRecovery = wordRecovery + answerArray[i];

                    //si le mot n'est pas entier, alors on rajoute les lettres qui manque

                    if (wordRecovery.length != sentenceArray[a].length) {
                        result = result + `<span class="text-warning">${sentenceArray[a].substring(wordRecovery.length, sentenceArray[a].length)}</span>`
                    }
                }


            } else if (answerArray[i].includes(sentenceArray[a])) {
                //sinon affiché en rouge les lettres en trop
                result = `<span class="text-success">${sentenceArray[a]}</span>`;

                for (var c = sentenceArray[a].length; c < answerArray[i].length; c++) {
                    result = result + `<span class="text-danger">${answerArray[i][c]}</span>`;
                }

            }

        }

        return result;
    }

    checkPositionCharacter(wordToTranslate, wordTranslated) {
        var pos = wordToTranslate.indexOf(wordTranslated);

        if (pos != 0) {
            return [false, pos];
        } else {
            return [true, pos];
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

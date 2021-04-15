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

    prioritizeWordBoardNew = [];

    static HARDCORE = 20;
    static REALLY_HARD = 40;
    static HARD = 60;
    static MEDIUM = 80;
    static EASY = 100;

    startQuizz(listWord, timer = false) {
        this.listWord = listWord;
        this.setContent();
        this.next();

        if (timer) {
            this.isTimer = true;
            this.goodAnswer = 0;
            this.option();
            this.timer();
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

    event() {
        this.mytranslate.addEventListener("keydown", function (e) {
            if (e.code === "Enter") {
                next();
            }
        });
    }

    stop() {
        console.log("Vous avez arrêté");
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

    //version 2 de selectWord
    selectWordNew() {

        if (this.prioritizeWordBoardNew.length == 5) {
            const random = Math.floor(Math.random() * this.prioritizeWordBoardNew.length);

            return this.prioritizeWordBoardNew[random];
        } else {
            return this.selectWord();
        }
    }

    //obsolète version
    selectWord() {
        var arrayWord = [];
        for (var i = 0; i < this.listWord.length; i++) {
            this.calculSuccessRate(i);
            if (parseInt(this.listWord[i]['success_rate']) <= Quizz.HARDCORE) {
                var a = 0;
                while (a < Math.round(this.listWord.length)) {
                    arrayWord.push(i);
                    a++;
                }
            } else if (parseInt(this.listWord[i]['success_rate']) <= Quizz.REALLY_HARD) {
                var a = 0;
                while (a < Math.round(this.listWord.length / 2)) {
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

        //si on se trompe trop sur un mot alors il apparait beaucoup plus souvent jusqu'à y arriver
        //ce qui évite que trop de mot hardcore apparaisse de manière régulière
        //ou qu'on ne tombe pas assez sur des mots dont on ne maitrise pas totalement
        if (this.prioritizeWordBoard.length != 0) {
            var a = 0;
            while (a < this.listWord.length * this.prioritizeWordBoard[1]) {
                arrayWord.push(this.prioritizeWordBoard[0]);
                a++;
            }
        }

        arrayWord = arrayWord.sort(() => Math.random() - 0.5);

        const random = Math.floor(Math.random() * arrayWord.length);
        //return number
        return arrayWord[random];
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

            if (this.calculAverage(idWord, this.reverse) > Quizz.HARD) {
                const index = this.prioritizeWordBoardNew.indexOf(idWord);
                if (index > - 1) {
                    this.prioritizeWordBoardNew.splice(index, 1);
                }
            }
        }

        console.log(this.prioritizeWordBoardNew);
    }

    checkWord(WordTranslated) {

        if ((this.reverse ? this.listWord[this.wordActual]['word_to_translate'].toLowerCase().trim() : this.listWord[this.wordActual]['word_translated'].toLowerCase().trim()) == WordTranslated.toLowerCase().trim()) {
            (this.reverse ? this.listWord[this.wordActual]['right_counter_reverse']++ : this.listWord[this.wordActual]['right_counter']++);
            this.rightCounter++;
            this.resultCheck = "good";
            this.calculSuccessRate(this.wordActual);
            this.goodAnswer++;

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

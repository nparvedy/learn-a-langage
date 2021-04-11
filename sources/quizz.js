class Quizz {

    listWord;
    content;
    wordActual;
    lastWord;
    mytranslate;
    resultCheck = "";
    rightCounter = 0;
    wrongCounter = 0;

    static HARDCORE = 20;
    static REALLY_HARD = 40;
    static HARD = 60;
    static MEDIUM = 80;
    static EASY = 100;

    startQuizz(listWord) {
        this.listWord = listWord;
        this.setContent();
        this.next();
    }

    setContent() {
        this.content = document.querySelector('#container-quizz');
    }

    next() {
        if (this.mytranslate != null) {
            this.lastWord = this.wordActual;
            this.checkWord(this.mytranslate.value);

        }
        this.wordActual = this.selectWord();

        this.content.innerHTML = `
        <div class="row align-items-md-stretch">
            <div class="col-md-6">
                <div class="h-100 p-4  border rounded-3">
                    <p>Le mot à traduire est :  ${this.listWord[this.wordActual]['word_to_translate']}</p>
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
        <div class="d-grid gap-2 mt-3 d-sm-flex">
            <button type="button" class="btn btn-primary"  onclick="quizz.next()">Suivant</button>
            <button type="button" class="btn btn-primary" onclick="quizz.stop()">Stop</button>
        </div>`;

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

    selectWord() {
        var arrayWord = [];
        for (var i = 0; i < this.listWord.length; i++) {
            this.calculSuccessRate(i);
            if (parseInt(this.listWord[i]['success_rate']) <= Quizz.HARDCORE) {
                var a = 0;
                while (a < 10) {
                    arrayWord.push(i);
                    a++;
                }
            } else if (parseInt(this.listWord[i]['success_rate']) <= Quizz.REALLY_HARD) {
                var a = 0;
                while (a < 6) {
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

        arrayWord = arrayWord.sort(() => Math.random() - 0.5);

        const random = Math.floor(Math.random() * arrayWord.length);
        return arrayWord[random];
    }

    checkWord(WordTranslated) {
        if (this.listWord[this.wordActual]['word_translated'].toLowerCase() == WordTranslated.toLowerCase()) {
            this.listWord[this.wordActual]['right_counter']++;
            this.rightCounter++;
            this.resultCheck = "good";
        } else {
            this.listWord[this.wordActual]['wrong_counter']++;
            this.wrongCounter++;
            this.resultCheck = "wrong";
        }
    }

    calculSuccessRate(i) {
        var divide = (parseInt(this.listWord[i]['right_counter']) + parseInt(this.listWord[i]['wrong_counter']));
        if (divide == 0) {
            divide = 1;
        }

        this.listWord[i]['success_rate'] = this.listWord[i]['right_counter'] * 100 / divide;
    }

    result(result = "") {
        var resultObject = document.querySelector("#result");

        if (result == "") {
            resultObject.innerHTML = "";
        } else if (result == "good") {
            resultObject.innerHTML = `
                <h2>Résultat</h2>
                <div class="alert alert-success" role="alert">
                    Bravo le bon mot était bien : ${this.listWord[this.lastWord]['word_translated']}
                </div>
                <p>Vous avez ${this.rightCounter} bon et ${this.wrongCounter} faux.</p>
                `;
        } else if (result == "wrong") {
            resultObject.innerHTML = `
            <h2>Résultat</h2>
            <div class="alert alert-danger" role="alert">
                Et non ! La traduction était plutôt : ${this.listWord[this.lastWord]['word_translated']}
            </div>
            <p>Vous avez ${this.rightCounter} bon et ${this.wrongCounter} faux.</p>
            `
        }

    }
}

var quizz = new Quizz;

function next() {
    quizz.next();
}


//script
let questions = [
    {
        "question": "Wie viele Einwohner hat Schweden?",
        "answer_1": "1 Mio",
        "answer_2": "10 Mio",
        "answer_3": "110 Mio",
        "answer_4": "1 Mrd",
        "right_answer": 2
    },
    {
        "question": "Wann geht die Sonne in Schweden im Juni unter?",
        "answer_1": "19:00 Uhr",
        "answer_2": "20:00 Uhr",
        "answer_3": "21:00 Uhr",
        "answer_4": "22:00 Uhr",
        "right_answer": 4
    },
    {
        "question": "Warum sprechen die Schweden so gut englisch?",
        "answer_1": "Sie hassen ihre eigene Sprache.",
        "answer_2": "Schwedisch hat einen armen Wortschatz, sodass sie sich in einer anderen Sprache besser ausdrücken können.",
        "answer_3": "Filme und Serien in Englischer Sprache werden nicht ins schwedische übersetzt, sondern bekommen nur schwedische Untertitel.",
        "answer_4": "Jeder Schüler der Oberstufe hat einen 2-jährigen Aufenthalt in einem englischsprachigen Land.",
        "right_answer": 3
    },
    {
        "question": "Was ist die zweit-größte Stadt Schwedens?",
        "answer_1": "Göteburg",
        "answer_2": "Kopenhagen",
        "answer_3": "Stockholm",
        "answer_4": "Oslo",
        "right_answer": 1
    },
    {
        "question": "Wie viele Deutsche leben in Schweden (Stand 2020)?",
        "answer_1": "3.000",
        "answer_2": "30.000",
        "answer_3": "300.000",
        "answer_4": "3 Mio",
        "right_answer": 2
    }
];

let currentquestion = 0;                            
let rightQuestions = 0;                             //richtige Antworten werden gezählt
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_NO = new Audio('audio/no.mp3');


function init() {
    document.getElementById('id-allquestions').innerHTML = questions.length;
    document.getElementById('button-wiederholen').style = 'display: none';

    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {                                      //show Endscreen
        showEndscreen();
    } else {                                                                        //show Question
        updateProgressbar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentquestion >= questions.length;
}

function showEndscreen() {
    document.getElementById('quiz-beendet').style = '';                                 //Endscreen angezeigt
    document.getElementById('quiz-gestartet').style = 'display: none';                  //Quiz ausgeblendet
    document.getElementById('button-wiederholen').style = '';                           //Button 'Quiz wiederholen' angezeigt
    document.getElementById('amount-of-questions').innerHTML = questions.length;        //Gesamtzahl der Fragen
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;    //Gesamtzahl der richtigen Antworten
    document.getElementById('header-image').src = 'img/win.jpg';                        //bild wird geändert
}

function updateProgressbar() {
    let percent = (currentquestion + 1) * 100 / questions.length;
    document.getElementById('progress-bar').innerHTML = `${percent} %`;         //%-Zahl in Progressbar
    document.getElementById('progress-bar').style = `width: ${percent}%;`;      //Breite von Progressbar
}

function updateToNextQuestion() {
    let question = questions[currentquestion];                                  //globale Variable currentquestion, Quiz beginnt bei 0 (also 1. Frage aus JSON)
    document.getElementById('question-number').innerHTML = currentquestion + 1; //nächste Frage angezeigt
    document.getElementById('id-question').innerHTML = question['question'];    //in der id Fragestellung
    document.getElementById('id-answer_1').innerHTML = question['answer_1'];    //in der id 1. Antwortmöglichkeit
    document.getElementById('id-answer_2').innerHTML = question['answer_2'];    //in der id 2. Antwortmöglichkeit
    document.getElementById('id-answer_3').innerHTML = question['answer_3'];    //in der id 3. Antwortmöglichkeit
    document.getElementById('id-answer_4').innerHTML = question['answer_4'];    //in der id 4. Antwortmöglichkeit
}

function answer(selection) {
    let question = questions[currentquestion];
    let answerNumber = selection.slice(-1);                                             // letzter Buchstabe von 'answer_x' in function answer('answer_1/2/3/4')
    let idOfRight = `id-answer_${question['right_answer']}`;                            //zeigt richtige Antwort grün an, wenn falsche angeklickt wird

    if (rightAnswerSelected(answerNumber)) {                                            //wenn richtige Antwort angeklickt wird
        document.getElementById(selection).parentNode.classList.add('bg-success');      //Antwort wird grün angezeigt
        rightQuestions++;                                                               //um 1 erhöht für Ergebnis des Quiz
        AUDIO_SUCCESS.currentTime = 0;
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');       //sonst (falsche Antwort) rot
        document.getElementById(idOfRight).parentNode.classList.add('bg-success');      //sonst (falsche Antwort) zusätzlich richtige Antwort grün
        AUDIO_NO.play();

    }

    document.getElementById('next-button').disabled = false;                            //Button "nächste Frage" anklickbar, nachdem eine Antwort angeklickt wurde
}

function rightAnswerSelected(answerNumber) {
    let question = questions[currentquestion];
    return answerNumber == question['right_answer'];
}

function nextQuestion() {
    currentquestion++;      // Variable currentQuestion wird um 1 erhöht, also das nächste JSON, nächste Frage mit deren Antwortmöglichkeiten wird angezeigt
    document.getElementById('next-button').disabled = true;     // Button "nächste Frage" nicht anklickbar 
    resetButtons();
    showQuestion();
}

function resetButtons() {       //Antworten weder rot noch grün
    document.getElementById('id-answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('id-answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('id-answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('id-answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('id-answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('id-answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('id-answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('id-answer_4').parentNode.classList.remove('bg-danger');
}

function quizWiederholen() {
    document.getElementById('header-image').src = 'img/quiz.jpg';        //bild wird geändert
    document.getElementById('quiz-gestartet').style = '';               //quiz anzeigen
    document.getElementById('quiz-beendet').style = 'display: none';     //endscreen ausblenen

    currentquestion = 0;    //aktuelle Frage wird wieder auf 0 gestzt
    rightQuestions = 0;     //richtige Antworten wieder auf 0 gesetzt
    init();
}
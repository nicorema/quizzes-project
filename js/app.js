//Data Structures
var quizzes = [];
var currentQuiz;

//UI Elements
const selectQuiz = document.getElementById("quiz-dropdown");
const quizTitle = document.getElementById("quiz-title");
const quizButton = document.getElementById("start-quiz-btn")
const quizList = document.getElementById("quiz-list-container");
const sendBtn = document.getElementById("send-btn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");

//Entities
function Quiz(object) {
    this.subject = object.subject;
    this.needed_score = object.needed_score;
    this.exercises = this.instanceExercises(object.exercises);
}

function Exercise(object) {
    this.id = object.id;
    this.type = object.type;
    this.question = object.question;
    this.answers = this.instanceAnswers(object.answers);
}

function Answer(object) {
    this.text = object.text;
    this.value = object.value;
}

Quiz.prototype.instanceExercises = function (exercises) {
    let instancedExercises = [];
    exercises.forEach(the_exercise => instancedExercises.push(new Exercise(the_exercise)));
    return instancedExercises;
}
Quiz.prototype.selectQuestions = function () {
    const questionsByQuiz = 10;
    suffleArray(this.exercises);
    return this.exercises.slice(0, questionsByQuiz);
}

Exercise.prototype.instanceAnswers = function (answers) {
    let instancedAnswers = [];
    answers.forEach(the_answers => instancedAnswers.push(new Answer(the_answers)));
    return instancedAnswers;
}


//Functions
async function fetchData(route) {
    let data = await fetch(route);
    let json = await data.json();
    return json;

}


function feedDropdown() {
    this.quizzes.forEach((quiz, index) => {
        let option = document.createElement('option');
        option.innerHTML = quiz.subject;
        option.value = index;
        selectQuiz.appendChild(option);
    });
}

function emptyList(baseUl) {
    while (baseUl.firstChild) {
        baseUl.removeChild(baseUl.firstChild);
    }
}
function getAnswerListByType(exercise) {
    switch (exercise.type) {
        //Multiple Choice One Answer T/F Incldued
        case 1:
            //return this.getMultipleChoiceSingleAnswerListToRender();
            break;
        //Fill In The Blank
        case 2:
            //return this.getFillInTheBlankListToRender();
            break;

        //Multiple Choice Multiple Answers
        case 3:
            //return this.getMultipleChoiceMultipleAnswersListToRender();
            break;

        default:
            console.log("Exercise Type Not Supported");
            break;
    }
}
function renderQuestionList(baseUl, questionArray) {
    questionArray.forEach(exercise => {
        let listItem = document.createElement("li");
        listItem.innerHTML = exercise.question;
        let answerList = getAnswerListByType(exercise);
        console.log(answerList);
        baseUl.appendChild(listItem);
    });
}

function printQuestions() {
    emptyList(quizList);
    renderQuestionList(quizList, this.currentQuiz.selectQuestions());
}

function initQuizTemplate() {
    printQuestions();
}

function getCheckedAnswers() {
    let radios = document.getElementsByClassName("quiz-radio-btn");
    let radiosArray = [].slice.call(radios);
    let checkedRadios;
    checkedRadios = radiosArray.filter(radio => radio.checked);
    return checkedRadios;
}

//Events
quizButton.onclick = function () {
    currentQuiz = quizzes[selectQuiz.value];
    initQuizTemplate();
}

sendBtn.onclick = function () {

    //console.log(fname.value);
    //console.log(lname.value);
    //Uconsole.log(getCheckedAnswers());
    getCheckedAnswers();

}
//Init Data
function handleData(data) {
    data.forEach(quiz => quizzes.push(new Quiz(quiz)));
    feedDropdown();
}


fetchData("https://api.myjson.com/bins/8vugd")
    .then(data => handleData(data))
    .catch(err => console.log(err));




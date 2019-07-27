//Data Structures
var quizzes;
var quizzesEntities = [];
var currentQuizEntitie;

//UI Elements
const selectQuiz = document.getElementById("quiz-dropdown");
const quizTitle = document.getElementById("quiz-title");
const quizButton = document.getElementById("start-quiz-btn")
const quizList = document.getElementById("quiz-list-container");
const sendBtn = document.getElementById("send-btn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");

//Constructors
function Quiz(object, exercises) {
    this.id = object.id;
    this.title = object.title;
    this.exercises = exercises;
}
Quiz.prototype.shuffleQuestions = function () {
    suffleArray(this.exercises);
}

function Exercise(object, answers) {
    this.question = object.question;
    this.answers = answers;
}
Exercise.prototype.shuffleAnswers = function () {
    suffleArray(this.answers);
}

function Answer(object) {
    this.text = object.text;
    this.value = object.value;
}

//Functions

async function fetchData(route) {
    let data = await fetch(route);
    let json = await data.json();
    return json;

}

function feedDropdown() {
    this.quizzesEntities.forEach(quiz => {
        let option = document.createElement('option');
        option.value = quiz.id;
        option.innerHTML = quiz.title;
        selectQuiz.appendChild(option);
    });
}

function initObjects() {
    this.quizzes.forEach(quiz => {
        let exercises = [];
        quiz.quiz.exercises.forEach(exercise => {
            let answers = [];
            exercise.answers.forEach(answer => answers.push(new Answer(answer)));
            exercises.push(new Exercise(exercise, answers));

        }
        );
        this.quizzesEntities.push(new Quiz(quiz.quiz, exercises));
    });
}

function printQuestions() {
    while (quizList.firstChild) {
        quizList.removeChild(quizList.firstChild);
    }
    this.currentQuizEntitie.exercises.forEach(exercise => {
        let listItem = document.createElement('li');
        listItem.innerHTML = exercise.question
        let optionList = document.createElement('ul');
        exercise.shuffleAnswers();
        exercise.answers.forEach(answer => {
            let optionItem = document.createElement('li');
            optionItem.innerHTML = answer.text.replace(/</g, "&lt");
            let radioBtn = document.createElement('input');
            radioBtn.type = "radio";
            radioBtn.name = exercise.question;
            //TODO hide somehow this from the html
            radioBtn.value = answer.value;
            radioBtn.className = "quiz-radio-btn"
            optionItem.appendChild(radioBtn);
            optionList.appendChild(optionItem);
        });

        quizList.appendChild(listItem);
        quizList.appendChild(optionList);
    });
}

function initQuizTemplate() {
    this.currentQuizEntitie.shuffleQuestions();
    printQuestions();
}

function getCheckedAnswers() {
    let radios = document.getElementsByClassName("quiz-radio-btn");
    let radiosArray = [].slice.call(radios);
    let checkedRadios;
    checkedRadios=radiosArray.filter(radio => radio.checked);
    console.log(checkedRadios);
    return checkedRadios;
}

//Events
quizButton.onclick = function () {
    currentQuizEntitie = quizzesEntities.filter(quiz => quiz.id == selectQuiz.value);
    currentQuizEntitie = currentQuizEntitie[0];
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
    this.quizzes = data;
    initObjects();
    feedDropdown();
}


fetchData("https://api.myjson.com/bins/y4sg1")
    .then(data => handleData(data))
    .catch(err => console.log(err));




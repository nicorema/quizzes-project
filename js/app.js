//UI Elements
const selectQuiz = document.getElementById("quiz-dropdown");
const quizTitle = document.getElementById("quiz-title");
const quizButton = document.getElementById("start-quiz-btn")
const quizList = document.getElementById("quiz-list-container");
const sendBtn = document.getElementById("send-btn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");

//Data Structures
var quizzes = [];
var currentQuiz;
var currentStudent;
var isLnameFilled = checkEmptyInput(lname);
var isFnameFilled = checkEmptyInput(fname)
updateStartBtn();
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

function Student(fname,lname,quiz){
    this.fname = fname;
    this.lname = lname;
    this.quiz = quiz;
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

function getAnswerType(typeNumber){
    switch(typeNumber){
        case 1:
            return {"answer_type":"radio" , "message":"Choose one answer"};
        case 2:
            return {"answer_type":"text" , "message":"Fill in the blank"};
        case 3:
            return {"answer_type":"checkbox" , "message":"Choose multiple answers (a wrong answer will subtract points)"};
        default:
            return null;
    }
}
function getAnwsersRenderList(exercise){
    let answers = exercise.answers;
    let answersList = document.createElement("ul");
    let type = getAnswerType(exercise.type).answer_type;

    answers.forEach(the_answer => {
        let questionLi = document.createElement("li");
        if(exercise.type != 2){
            questionLi.innerHTML = the_answer.text;
        }
        let input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('name', exercise.id);
        input.setAttribute('id', exercise.id);

        questionLi.appendChild(input);
        answersList.appendChild(questionLi);
    });
    return answersList
}

function renderQuestionList(baseUl, questionArray) {
    questionArray.forEach(exercise => {
        let listItem = document.createElement("li");
        listItem.innerHTML = exercise.question;
        let typeAlert = document.createElement("strong");
        typeAlert.innerHTML = getAnswerType(exercise.type).message;
        listItem.appendChild(typeAlert);
        let answerList = getAnwsersRenderList(exercise);
        listItem.appendChild(answerList);
        baseUl.appendChild(listItem);
    });
}

function printExercises() {
    emptyList(quizList);
    renderQuestionList(quizList, this.currentQuiz.selectQuestions());
}


function updateStartBtn(){
    console.log(isFnameFilled+" "+isLnameFilled);
    quizButton.disabled = !(isFnameFilled && isLnameFilled);
}
//Events
quizButton.onclick = function () {
    currentQuiz = quizzes[selectQuiz.value];
    printExercises();
}

quizButton.onclick = function () {
    let confirmMessage;
    confirmMessage += fname.value +" "+ lname.value;
    confirmMessage = addEndLineBreak(confirmMessage);
    confirmMessage += "Vas a iniciar el quiz:";
    confirmMessage = addEndLineBreak(confirmMessage); 
    confirmMessage += "ye ye ye";
    confirm(confirmMessage);
}

fname.oninput = function(){
    isFnameFilled = checkEmptyInput(this);
    updateStartBtn();
}

lname.oninput = function(){
    isLnameFilled = checkEmptyInput(this);
    updateStartBtn();
}

//Init Data
function handleData(data) {
    data.forEach(quiz => quizzes.push(new Quiz(quiz)));
    feedDropdown();
}


fetchData("https://api.myjson.com/bins/6g957")
    .then(data => handleData(data))
    .catch(err => console.log(err));




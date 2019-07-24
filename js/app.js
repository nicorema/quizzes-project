//Data Structures
var quizzes;
var quizzesEntities = [];
var currentQuizEntitie;

//UI Elements
const selectQuiz = document.getElementById("quiz-dropdown");
const quizTitle = document.getElementById("quiz-title");
const quizButton = document.getElementById("start-quiz-btn")
const quizList = document.getElementById("quiz-list-container");
    
//Constructors
function Quiz(object, exercises) {
    this.id = object.id;
    this.title = object.title;
    this.exercises = exercises;
}
Quiz.prototype.shuffleQuestions=function(){
    suffleArray(this.exercises);
}

function Exercise(object,answers) {
    this.question = object.question;
    this.answers = answers;
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

function printQuestions(){
    while (quizList.firstChild) {
        quizList.removeChild(quizList.firstChild);
    }
    this.currentQuizEntitie.exercises.forEach(exercise => {
        let listItem = document.createElement('li');
        listItem.innerHTML = exercise.question
        quizList.appendChild(listItem);
    });
}

function initQuizTemplate(){
    this.currentQuizEntitie.shuffleQuestions();
    printQuestions();
}

//Events
quizButton.onclick = function(){
    currentQuizEntitie = quizzesEntities.filter(quiz => quiz.id == selectQuiz.value);
    currentQuizEntitie = currentQuizEntitie[0];
    initQuizTemplate();
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




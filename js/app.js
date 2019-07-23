let quizzes;

async function fetchData(route) {
    let data = await fetch(route);
    let json = await data.json();
    return json;

}

function feedDropdown(){
    let selectQuiz = document.getElementById("quiz-dropdown");
    this.quizzes.forEach(quiz => {
        let option = document.createElement('option');
        option.value = quiz.quiz.id;
        option.innerHTML = quiz.quiz.title;
        selectQuiz.appendChild(option);
    });
}

function handleData(data) {
    this.quizzes = data;
    feedDropdown();
}


fetchData("https://api.myjson.com/bins/y4sg1")
    .then(data =>handleData(data))
    .catch(err => console.log(err));

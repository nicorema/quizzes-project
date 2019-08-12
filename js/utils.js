function suffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkEmptyInput(input){
    return input.value.length > 0 ? true : false;
}

function addEndLineBreak(string){
    return string +='\n';
}
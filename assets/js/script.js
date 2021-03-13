var today = moment();
$("#date").text(today.format("MMMM Do, YYYY"));
$("#timerspace").hide();
$("#scoreboard").hide();
const start = document.querySelector("#Start");
const choiceA = document.querySelector("#A");
const choiceB = document.querySelector("#B");
const choiceC = document.querySelector("#C");
const choiceD = document.querySelector("#D");
let next = false;
let points = 0;
Start.addEventListener("click", StartQuiz);
const timer = document.getElementById("timer");
const scoreboard = document.getElementById("scoreboard");
var totalTime = 60;


const Question1 = {
    name: 'Question 1',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want?',
    correct: "A"
};

const Question2 = {
    name: 'Question 2',
    answer: ["Baseball", "Hockey", "Basketball", "Football"],
    question: 'What sport do you want?',
    correct: "D"
};

const Question3 = {
    name: 'Question 3',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "A"
};

const Question4 = {
    name: 'Question 4',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "A"
};

const Question5 = {
    name: 'Question 5',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "C"
};

const Question6 = {
    name: 'Question 6',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "D"
};

const Question7 = {
    name: 'Question 7',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "C"
};

async function SetProblem(Question) {
    $("#question").text(Question.name);
    $("#problem").text(Question.question);
    $("#A").text(Question.answer[0]);
    $("#B").text(Question.answer[1]);
    $("#C").text(Question.answer[2]);
    $("#D").text(Question.answer[3]);
    let correctAnswer = Question.correct;

    let result = await CheckAnswer(correctAnswer);
    if (result === true) {
        points += totalTime
    }
    return new Promise(resolve => {
        resolve(console.log("Question Answered")); 
    });
}
function CheckAnswer(correctAnswer) {
    return new Promise(resolve => {
    $('#A').click(() => { if (correctAnswer === "A") {
        resolve(true) 
    }else {
        totalTime -= 3
        timer.textContent = totalTime + " seconds left to finish the quiz.";
    }});
    $('#B').click(() => { if (correctAnswer === "B") {
        resolve(true) 
    }else {
        totalTime -= 3
        timer.textContent = totalTime + " seconds left to finish the quiz.";
    }});
    $('#C').click(() => { if (correctAnswer === "C") {
        resolve(true) 
    }else {
        totalTime -= 3
        timer.textContent = totalTime + " seconds left to finish the quiz.";
    }});
    $('#D').click(() => { if (correctAnswer === "D") {
        resolve(true) 
    }else {
        totalTime -= 3
        timer.textContent = totalTime + " seconds left to finish the quiz.";
    }});
    });
}


function setTime() {
    
    var timerInterval = setInterval(function() {
        timer.textContent = totalTime + " seconds left to finish the quiz.";
        totalTime--;
  
        if(totalTime <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Time's Up!";
            endGame();
        }
    }, 1000);
  }
async function StartQuiz(event) {
    const Questions = [Question1, Question2, Question3, Question4, Question5, Question6, Question7]
    $("#title").hide();
    $("#timerspace").show();
    setTime();
    $("#scoreboard").show();
    for (let i = 0; i < Questions.length; i++) {
        await SetProblem(Questions[i]);
        scoreboard.textContent = points;
    }
    endGame();
}
function endGame() {
    $("#quiz").hide();
}

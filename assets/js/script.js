//Startup methods
var today = moment();
$("#date").text(today.format("MMMM Do, YYYY"));
$("#timerspace").hide();
$("#scoreboard").hide();
$("#leaderboard").hide();


//Linking the html 
const start = document.querySelector("#Start");
const playAgain = document.querySelector("#playAgain");
const choiceA = document.querySelector("#A");
const choiceB = document.querySelector("#B");
const choiceC = document.querySelector("#C");
const choiceD = document.querySelector("#D");
let next = false;
let points = 0;
const scoreboard = document.getElementById("scoreboard");
let totalTime = 2000;
const submit = document.querySelector("#submit");
const initials = $('input[id="initials"]');
const rankings = document.querySelector("#rankings");
const timer = document.getElementById("timer")

//Declares each Question
const Question1 = {
    name: 'Question 1',
    answer: ["At the end of the body tag", "In the head tag", "In the beginning of the body tag", "It doesn't go in the html"],
    question: 'Where should you reference the js file in your html?',
    correct: "A",
};
const Question2 = {
    name: 'Question 2',
    answer: ["Baseball", "Hockey", "Basketball", "Football"],
    question: 'What sport do you want?',
    correct: "D",
};
const Question3 = {
    name: 'Question 3',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "A",
};
const Question4 = {
    name: 'Question 4',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "A",
};
const Question5 = {
    name: 'Question 5',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "C",
};
const Question6 = {
    name: 'Question 6',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "D",
};
const Question7 = {
    name: 'Question 7',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "C",
};
const Question8 = {
    name: 'Question 8',
    answer: ["int num = 1", "num = 1", "const num = 1", "1 = num"],
    question: 'Which is the correct declaration of a variable that equals 1?',
    correct: "C",
};
const Question9 = {
    name: 'Question 9',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: '',
    correct: "C",
};
const Question10 = {
    name: 'Question 10',
    answer: ["Apple", "Banana", "Oranges", "Grapes"],
    question: 'What fruit do you want.',
    correct: "C",
};

//Places all questions into one bucket
const Questions = [Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10]

//Counter
let i = 0;

//Sets the Question
const SetProblem = function(cQuestion) {
    scoreboard.textContent = points;
    let Question = cQuestion
    $("#question").text(Question.name);
    $("#problem").text(Question.question);
    $("#A").text(Question.answer[0]);
    $("#B").text(Question.answer[1]);
    $("#C").text(Question.answer[2]);
    $("#D").text(Question.answer[3]);

    choiceA.addEventListener("click", checkAnswer);
    choiceB.addEventListener("click", checkAnswer);
    choiceC.addEventListener("click", checkAnswer);
    choiceD.addEventListener("click", checkAnswer);

    return;
}
//Checks to see if user inputted the correct or the wrong answer
const checkAnswer = function(event) {
    let element = event.target;
    
    if (element.value === Questions[i].correct) {
        points += totalTime;
        console.log("Next Question");
        i++;
        if (i === 10) {
            endGame();
            return;
        }
        SetProblem(Questions[i])
    } else {
        totalTime -= 300;
        console.log("-3 seconds on the clock");
    }
}
//Starts the timer, and upon reaching 0 will end the game
const setTime = function () {
    let time = setInterval(() => {
        if(totalTime <= 0) {
            clearInterval(time);
            endGame();
            return;
        }
        totalTime--;
        timer.innerHTML = totalTime/100 + " seconds left to finish the quiz.";
        return;
    }, 10)
}
//Starts the Quiz
const StartQuiz = function(event) {
    points = 0;
    i = 0;
    event.preventDefault();
    totalTime = 2000
    $("#Start").hide();
    $("#enterInitials").show();
    $("#leaderboard").hide();
    $("#title").hide();
    $("#quiz").show();
    $("#timerspace").show();
    setTime();
    $("#scoreboard").show();
    SetProblem(Questions[i]);
    return;
}
//Ends the game (Hide Quiz & Display Leaderboard)
const endGame = function() {
    totalTime = 0;
    $("#quiz").hide();
    $("#leaderboard").show();
    timer.innerHTML = "Time's Up!";
    scoreboard.textContent = "You're score is " + points;
    submit.addEventListener("click", submitInitial);
    return;
}

//Button Handlers for Starting the Quiz, Playing Again
start.addEventListener("click", StartQuiz);
playAgain.addEventListener("click", StartQuiz);
submit.addEventListener("click", submitInitial);

//Restrict all keys but the alphabet keys from being pressed
const restrictTheseKeys = function(event) {
    var e = window.event; // gets the key thats pressed
    var key = e.keyCode; // gets the key's code that was pressed

    if ((key < 65 || key > 90) && (key !== 8)) { //if it is a letter, prevent default
        e.preventDefault(); //normal browsers
    }
}
//Submitting Initials Function
function submitInitial(event) {
    event.preventDefault();
    if (initials.val().length >= 2 && isNaN(initials.val())) {
        let p = document.createElement('li');
        p.append(document.createTextNode(initials.val().toUpperCase() + " - " + points + " PTS"));
        rankings.append(p);
        submit.removeEventListener("click", submitInitial);
        $("#enterInitials").hide();
    } else {
        alert("Initials must be 2-3 letters")
    }
    initials.val("")
    return
}
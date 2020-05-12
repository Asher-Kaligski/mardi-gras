q1 = new Question(1, "Which of the following is not one of New Orleans' Mardi Gras colors?", [{
    answer: "purple",
    isCorrect: false
}, {
    answer: "green",
    isCorrect: false
}, {
    answer: "yellow",
    isCorrect: false
}, {
    answer: "blue",
    isCorrect: true
}], null);

q2 = new Question(2, "Which of the New Orleans Mardi Gras colors is not a Mobilian Mardi Gras color?", [{
    answer: "purple",
    isCorrect: false
}, {
    answer: "green",
    isCorrect: true
}, {
    answer: "yellow",
    isCorrect: false
}, {
    answer: "blue",
    isCorrect: false
}], null);

q3 = new Question(3, "What medieval tradition can Mardi Gras be traced back to?", [{
        answer: "feasting before the arrival of Lent",
        isCorrect: true
    },
    {
        answer: "the throwing of trinkets by children to celebrate Lent",
        isCorrect: false
    },
    {
        answer: "parading held in celebration of Lent",
        isCorrect: false
    },
    {
        answer: "ordinary citizens dressing in costume to celebrate Lent",
        isCorrect: false
    }
], null);

q4 = new Question(4, "What is the name of the first mystic society, created in 1830?", [{
    answer: "Cowbellion de Rakin Society",
    isCorrect: true
}, {
    answer: "The Lost Cause Minstrels",
    isCorrect: false
}, {
    answer: "Crewe of Comos",
    isCorrect: false
}, {
    answer: "Order of Myths",
    isCorrect: false
}], null);

q5 = new Question(5, "When did this original mystic society hold its parade?", [{
        answer: "Mardi Gras Day",
        isCorrect: false
    },
    {
        answer: " New Year's Eve",
        isCorrect: true
    },
    {
        answer: " Christmas Eve",
        isCorrect: false
    },
    {
        answer: "Easter Sunday",
        isCorrect: false

    }
], null);

q6 = new Question(6, "How did the Spanish add their touch to the French Mardi Gras?", [{
    answer: "by marching on a different day",
    isCorrect: false
}, {
    answer: "by holding lighted torch parades",
    isCorrect: true
}, {
    answer: "by throwing woven Spanish dolls off of the floats",
    isCorrect: false
}, {
    answer: "by changing the name to 'Martes Gordo'",
    isCorrect: false
}], null);

q7 = new Question(7, "Which of the following was New Orleans' first mystic society?", [{
    answer: "Order of Inca",
    isCorrect: false
}, {
    answer: "Crewe of Columbus",
    isCorrect: false
}, {
    answer: "Comic Cowboys",
    isCorrect: false
}, {
    answer: "Crewe of Comos",
    isCorrect: true
}], null);

q8 = new Question(8, "Which of the following societies did Joseph Cain found?", [{
    answer: "Crewe of Comos",
    isCorrect: false
}, {
    answer: "Mystics of Time",
    isCorrect: false
}, {
    answer: "Strikers Independent Society",
    isCorrect: false
}, {
    answer: "Order of Myths",
    isCorrect: true
}], null);

q9 = new Question(9, "What was the first black mystic society in Mobile?", [{
    answer: "Order of Doves",
    isCorrect: true
}, {
    answer: "Order of Mammoths",
    isCorrect: false
}, {
    answer: "Knights of May Zulu Club",
    isCorrect: false
}, {
    answer: "Colored Carnival Association",
    isCorrect: false
}], null);

q10 = new Question(10, "Which of the following was Mobile's first women's society?", [{
    answer: "Order of Athena",
    isCorrect: false
}, {
    answer: "Polka Dots",
    isCorrect: true
}, {
    answer: "Le Krewe de Bienville",
    isCorrect: false
}, {
    answer: "Mystical Ladies",
    isCorrect: false
}], null);

const questionsArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

const gameBox = document.getElementById("trivia-gameBox");
const questionBtn = document.querySelector(".question");
const nextButton = document.getElementById("nextButton");
const scoreCard = document.getElementById("scoreCard");
const answerBtnArr = document.querySelectorAll(".answer");
const classWrongAnswer = ["fas", "fa-times", "fa-3x", "animated", "flash", "slow"];
const classCorrectAnswer = ["fas", "fa-check", "fa-2x", "animated", "flash", "slow"];
const classGameBox = ["animated", "lightSpeedIn", "slowest"];
const classScoreCard = ["animated", "heartBeat", "slow"];
let shuffledQuestions = null;
let currentQuestion = null;
let currentQuestionIndex = null;
let currentAnswersArr = null;
let clickAnswerBtn = null;
let scoreCounter = null;


startGame();

nextButton.addEventListener("click", function () {

    answerBtnArr.forEach(answer => {
        answer.removeAttribute('disabled');
    });

    scoreCard.parentElement.classList.remove(...classScoreCard);
    if (currentQuestionIndex == questionsArr.length - 1) {

        startGame();
    } else {
        currentQuestionIndex++;
        currentQuestion = questionsArr[currentQuestionIndex];

        setNextQuestion();

    }

});

function Question(id, question, answerArr, result) {

    this.id = id
    this.question = question
    this.answerArr = answerArr
    this.result = result

}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function setNextQuestion() {

    if (nextButton.innerText === "Restart") {
        nextButton.innerText = "Next";
    }

    gameBox.classList.add(...classGameBox);
    if (clickAnswerBtn != null) {
        clickAnswerBtn.parentElement.previousElementSibling.firstElementChild.classList.remove(...classCorrectAnswer);
        clickAnswerBtn.parentElement.previousElementSibling.firstElementChild.classList.remove(...classWrongAnswer);
        clickAnswerBtn.parentElement.previousElementSibling.style.display = "none";
    }
    currentAnswersArr = null;

    currentAnswersArr = JSON.parse(JSON.stringify(currentQuestion.answerArr));
    shuffle(currentAnswersArr);

    showQuestion();
}

function checkAnswer(btn) {
    gameBox.classList.remove(...classGameBox);
    clickAnswerBtn = btn;
    answerBtnArr.forEach(answer => {
        answer.disabled = "true";
    });

    let isCorrect = clickAnswerBtn.dataset.isCorrect === "true" ? true : false;

    if (isCorrect) {
        scoreCounter++;
        clickAnswerBtn.parentElement.previousElementSibling.firstElementChild.classList.add(...classCorrectAnswer);

    } else {
        clickAnswerBtn.parentElement.previousElementSibling.firstElementChild.classList.add(...classWrongAnswer);
    }

    clickAnswerBtn.parentElement.previousElementSibling.style.display = "block";

    nextButton.disabled = false;

    scoreCard.parentElement.classList.add(...classScoreCard);
    scoreCard.innerHTML = (currentQuestionIndex + 1) + "/" + scoreCounter;

    if (currentQuestionIndex == questionsArr.length - 1) {

        nextButton.innerText = "Restart";
    }
}

function showQuestion() {

    nextButton.disabled = "true";

    questionBtn.innerText = currentQuestion.question;

    for (let i = 0; i < answerBtnArr.length; i++) {
        answerBtnArr[i].innerText = currentAnswersArr[i].answer;
        answerBtnArr[i].dataset.isCorrect = currentAnswersArr[i].isCorrect;
    }
}

function startGame() {

    scoreCard.innerHTML = 0;

    answerBtnArr.forEach(answerBtn => {
        answerBtn.parentElement.previousElementSibling.style.display = "none";
    });
    shuffle(questionsArr);
    scoreCounter = 0;
    currentQuestionIndex = 0;
    currentQuestion = null;
    currentQuestion = questionsArr[currentQuestionIndex];
    setNextQuestion();
}
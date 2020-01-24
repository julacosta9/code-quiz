let mainText = $("#main-text");
let questionText = $("#question-text");
let startBtn = $("#start-btn");
let time = $("#time");

let timeLeft = 2;
let score = 0;
let questionCounter = 0;

let questions = [
  {
    question: "Who is the strongest?",
    answers: {
      1: "Superman",
      2: "The Terminator",
      3: "Waluigi, obviously",
      4: "All of the above",
      5: "None of the above"
    },
    correctAnswer: 3
  },

  {
    question: "What's my favorite color?",
    answers: {
      1: "Blue",
      2: "Red",
      3: "Green",
      4: "All of the above",
      5: "None of the above"
    },
    correctAnswer: 1
  }
];

var timerInterval;

function startTimer() {
  const timer = setInterval(function() {
    time.text(timeLeft);
    timeLeft--;
    if (timeLeft <= -1) {
      clearInterval(timer);
    }
  },1000)
}
  
//   setInterval(function() {
//     console.log("Start Timer");
//     time.text(timeLeft);
//     timeLeft--;
//   }, 1000);
// }

startBtn.on("click", function() {
  time.text(timeLeft);
  startBtn.remove();
  displayQuestion();
  startTimer();


});



function displayQuestion() {
  questionText.empty();
  if (questionCounter >= questions.length) {
    console.log("display end game results");
  } else {
    mainText.text(questions[questionCounter].question);
    let numOfAnswers = Object.keys(questions[questionCounter].answers).length;

    for (let i = 0; i < numOfAnswers; i++) {
      let btn = $("<button>");
      btn.addClass("btn btn-primary answer-btn");
      btn.attr("data-index", i + 1);
      btn.text(questions[questionCounter].answers[i + 1]);
      questionText.append(btn);
      questionText.append("<br>");
    }
    questionCounter++;
  }
}

function updateScore() {
  let answerChosen = this.getAttribute("data-index");
  console.log(answerChosen);

  if (questions[questionCounter]) {
    if (answerChosen == questions[questionCounter].correctAnswer) {
      score++;
      console.log("User answered a question correctly. New score: " + score);
    } else {
      timeLeft -= 10;
      time.text(timeLeft);
      console.log("Time penalty. New time: " + timeLeft);
    }
  } else {
    console.log("No questions left");
    return;
  }
}

$(document).on("click", '.answer-btn', displayQuestion);
$(document).on("click", '.answer-btn', updateScore)

// function setTime() {
//   var timerInterval = setInterval(function() {
//     console.log("asdf");
//     time.text(timeLeft);
//     timeLeft--;

//     if (timeLeft === 0) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);
// }

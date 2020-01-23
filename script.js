let mainText = $("#main-text");
let questionText = $("#question-text");
let startBtn = $("#start-btn");
let time = $("#time");

let timeLeft = 100;
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

startBtn.on("click", function() {
  time.text(timeLeft);
  startBtn.remove();
  displayQuestion();

  var timerInterval = setInterval(function() {
    console.log("Start Timer");
    time.text(timeLeft);
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  $(".answer-btn").on("click", displayQuestion);
  $(".answer-btn").on("click", updateScore);
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
      questionText.append("<div></div>");
    }
    questionCounter++;
  }
}

function updateScore() {
  let answerChosen = this.getAttribute("data-index");

  if (answerChosen === questions[questionCounter].correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }
}

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

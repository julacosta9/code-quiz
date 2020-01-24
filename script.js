let mainText = $("#main-text");
let questionText = $("#question-text");
let startBtn = $("#start-btn");
let timeContainer = $("#time");

let timer;
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

let highScores = [
  {
    player: "Julian",
    score: 1000
  },
  {
    player: "Harrison, Steph, and Izzy",
    score: 9001
  },
  {
    player: "Random troll",
    score: 300
  },
  {
    player: "Anon",
    score: 70
  },
  {
    player: "Jonah Hill",
    score: 1
  }
];

function startTimer() {
  timer = setInterval(function() {
    timeContainer.text(timeLeft);
    timeLeft--;
    if (timeLeft <= -1) {
      clearInterval(timer);
    }
  }, 1000);
}

function displayQuestion() {
  questionText.empty();
  if (questionCounter >= questions.length) {
    displayResults();
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
    // questionCounter++;
  }
}

function updateScore() {
  let answerChosen = this.getAttribute("data-index");
  console.log("User chose answer: " + answerChosen);
  console.log("Correct answer is: " + questions[questionCounter].correctAnswer);

  if (questions[questionCounter]) {
    if (answerChosen == questions[questionCounter].correctAnswer) {
      score++;
      console.log("User answered a question correctly. New score: " + score);
    } else {
      timeLeft -= 10;
      timeContainer.text(timeLeft);
      console.log("Time penalty. New time: " + timeLeft);
    }
  } else {
    console.log("No questions left");
    return;
  }

  questionCounter++;
}

function displayResults() {
  clearInterval(timer);
  questionText.empty();

  let resultsMessage =
    "You answered " +
    score +
    " out of " +
    questions.length +
    " questions correctly. You finished the quiz with " +
    timeLeft +
    " seconds remaining.";

  let btn = $("<button>");
  btn.addClass("btn btn-primary restart-btn");
  btn.text("Play Again");

  mainText.text("Results");
  questionText.text(resultsMessage);
  questionText.append($("<br>"));
  questionText.append(btn);
}

startBtn.on("click", function() {
  // move this into some kind of function

  timeContainer.text(timeLeft);
  startBtn.remove();
  displayQuestion();
  startTimer();
});

$(document).on("click", ".answer-btn", updateScore);
$(document).on("click", ".answer-btn", displayQuestion);
// $(document).on("click", ".restart-btn", initializeQuiz);

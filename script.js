let mainText = $("#main-text");
let questionText = $("#question-text");
let startBtn = $("#start-btn");
let timeContainer = $("#time");

let timer;
let timeLeft = 100;
let score = 0;
let scoreTotal = 0;
let questionCounter = 0;

let questions = [
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: {
      1: "msg('Hello World')",
      2: "msgBox('Hello World')",
      3: "alertBox('Hello World')",
      4: "alert('Hello World')"
    },
    correctAnswer: 4
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    answers: {
      1: "True",
      2: "False"
    },
    correctAnswer: 2
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: {
      1: "call myFunction()",
      2: "myFunction()",
      3: "call function myFunction()"
    },
    correctAnswer: 2
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: {
      1: "<!--This is a comment-->",
      2: "//This is a comment",
      3: "'This is a comment"
    },
    correctAnswer: 2
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: {
      1: "round(7.25)",
      2: "Math.rnd(7.25)",
      3: "Math.round(7.25)",
      4: "rnd(7.25)"
    },
    correctAnswer: 3
  }
];

let highScores = [
  {
    player: "Ownen Wilson",
    score: 600
  },
  {
    player: "Harrison, Steph, and Izzy",
    score: 9001
  },
  {
    player: "Jonah Hill",
    score: 300
  },
  {
    player: "A golden retreiver",
    score: 70
  },
  {
    player: "A bot",
    score: 1
  }
];

function initializeQuiz() {
  timeLeft = 100;
  score = 0;
  questionCounter = 0;
  timeContainer.text(timeLeft);
  startBtn.remove();
  displayQuestion();

  clearInterval(timer);
  startTimer();
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
      btn.addClass("btn answer-btn animated fadeInDown fast");
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
      $("#question-alert").empty();
      console.log("User answered a question correctly. New score: " + score);

      if (questionCounter + 1 < questions.length) {
        let div = $("<div>");
        div.addClass("alert alert-success animated fadeInDown fast");
        div.text("GOOD!");
        $("#question-alert").append(div);

        setTimeout(function() {
          $("#question-alert").empty();
        }, 1500);
      }
    } else {
      timeLeft -= 10;
      timeContainer.text(timeLeft);
      console.log("Time penalty. New time: " + timeLeft);
      $("#question-alert").empty();

      if (questionCounter + 1 < questions.length) {
        let div = $("<div>");
        div.addClass("alert alert-danger animated fadeInDown fast");
        div.text("WRONG!");
        $("#question-alert").append(div);

        setTimeout(function() {
          $("#question-alert").empty();
        }, 1500);
      }
    }
  } else {
    console.log("No questions left");
    return;
  }
  questionCounter++;
}

function startTimer() {
  timer = setInterval(function() {
    timeContainer.text(timeLeft);
    timeLeft--;
    if (timeLeft <= -1) {
      clearInterval(timer);
    }
  }, 1000);
}

function displayResults() {
  clearInterval(timer);
  questionText.empty();
  scoreTotal = score * 100 + timeLeft;

  let resultsMessage =
    "You answered " +
    score +
    " out of " +
    questions.length +
    " questions correctly and finished with " +
    timeLeft +
    " seconds remaining. You scored " +
    scoreTotal +
    " points.";

  mainText.text("Results");
  questionText.text(resultsMessage);
  getPlayerName();
}

function getPlayerName() {
  highScores.sort(function(a, b) {
    return b.score - a.score; // sort from largest to smallest
  });
  if (scoreTotal > highScores[4].score) {
    // display highscore method and field to enter name.
    let highScoreMessage = $("<p>");
    highScoreMessage.text("New highscore! Enter your name:");
    questionText
      .append($("<br>"))
      .append($("<br>"))
      .append(highScoreMessage)
      .append($("<input>").attr("id", "player-name-field"))
      .append($("<br>"))
      .append(
        $("<button>")
          .addClass("btn submit-player-name-btn submit")
          .text("OK!")
      );

    // create new player object and push to array
    // then sort and remove last object in array

    // display highscore card.
  } else {
    let btn = $("<button>");
    btn.addClass("btn btn-primary restart-btn");
    btn.text("Play Again");
    questionText
      .append($("<br>"))
      .append($("<br>"))
      .append(btn);
  }
}

function displayHighscore() {
  let playerName = $("#player-name-field").val();

  if (playerName !== undefined) {
    highScores.push(new Player(playerName, scoreTotal));
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });
    highScores.pop();
  }

  mainText.text("High Scores");
  questionText.empty();
  startBtn.remove();

  let row = $("<div>").addClass("row justify-content-center");
  let col = $("<div>").addClass("col-xs-8");
  let listGroup = $("<div>")
    .addClass("list-group")
    .attr("id", "high-score-list");
  questionText.append(row);
  row.append(col);
  col.append(listGroup);

  for (let i = 0; i < highScores.length; i++) {
    let item = $("<a>").addClass("list-group-item list-group-item-action");

    if (playerName == highScores[i].player) {
      item.addClass("current-player animated shake");
    }

    item.text(highScores[i].player + ": " + highScores[i].score + " Points");
    $("#high-score-list").append(item);
  }

  let btn = $("<button>");
  btn.addClass("btn btn-lg restart-btn");
  btn.text("Take Quiz");
  questionText.append($("<br>"));
  questionText.append(btn);
}

function Player(name, score) {
  this.player = name;
  this.score = score;
}

startBtn.on("click", initializeQuiz);
$("#viewHighScoresBtn").on("click", displayHighscore);
$(document).on("click", ".answer-btn", updateScore);
$(document).on("click", ".answer-btn", displayQuestion);
$(document).on("click", ".restart-btn", initializeQuiz);
$(document).on("click", ".submit", displayHighscore);

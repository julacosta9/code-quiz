// http://gif-explode.com/?explode=https://i.imgur.com/XX0Tefj.gif

// Quiz Questions: https://www.w3schools.com/quiztest/quiztest.asp?qtest=JavaScript

// set up basic html first

// grab ids

// eventlistener on click 
    // start timer and begin keeping score



// high score function
    // keep highscores in object. try using construction function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

function Player (name, score) {
    this.name = name;
    this.score = score;
}

let highscores = []

highscores.push(new Player ("Julian", 10)); // run this the player 
  
  // sort by value
highscores.sort(function (a, b) {
    return b.score - a.score; // sort from largest to smallest
});
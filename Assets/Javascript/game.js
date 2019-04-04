//starting and restarting the game after each win/loss

//creating variables
var lives = 10;
var words = ["mario", "link", "samus", "sonic", "bowser", "sega", "nintendo", "zelda"];
var numBlanks = 0;
var unguessedWord = [];
var wins = 0;
var losses = 0;
var badGuesses = [];
var lettersInWord = [];
var userGuess = "";
var wordSelect = "";
var audioWin = new Audio("Assets/images/win.wav")
var audioLose = new Audio("Assets/images/lose.wav")


//function that actually starts and resets the game after each round
function startGame() {

   //resetting the lives each round
   lives = 10;

   //selects a random word
   wordSelect = words[Math.floor(Math.random() * words.length)];

   //splitting the chosen word into individual letters
   lettersInWord = wordSelect.split("");

   //counting the number of letters in the word
   numBlanks = lettersInWord.length;
   console.log(wordSelect);

   //resetting the users bad guesses and creating a new word for each round
   unguessedWord = [];
   badGuesses = [];

   //pushing a "_" for each letter in the selected word
   for (var i = 0; i < numBlanks; i++) {
      unguessedWord.push("_");
   }
   console.log(unguessedWord);
   console.log(numBlanks);

   //getting elements from HTML
   document.getElementById("livesleft").innerHTML = ("LIVES LEFT: " + lives);
   document.getElementById("selectedword").innerHTML = unguessedWord.join(" ");
   document.getElementById("lettersguessed").innerHTML = ("LETTERS GUESSED: " + badGuesses.join(" "));
}
//checking the letters in the randomly selected word
function checkGuess(letter) {
   var guess = false;

   //looping through the selected word
   for (var i = 0; i < numBlanks; i++) {

      //if the array created 
      if (wordSelect[i] === userGuess) {
         guess = true;
      }
   }
   if (guess) {
      for (var x = 0; x < numBlanks; x++) {
         if (wordSelect[x] === userGuess) {
            unguessedWord[x] = letter;
         }
      }
   }
   //subtracting a life for each incorrect guess
   else {
      badGuesses.push(letter);
      lives--;
   }
};

//function to run when a round is completed
function roundFinish() {

   document.getElementById("livesleft").innerHTML = ("LIVES LEFT: " + lives);
   document.getElementById("selectedword").innerHTML = unguessedWord.join(" ");
   document.getElementById("lettersguessed").innerHTML = ("LETTERS GUESSED: " + badGuesses.join(" "));

   //checking to see if the two arrays match and if so, alerts the user to win an adds 1 to the wins column
   if (unguessedWord.toString() === lettersInWord.toString()) {
      setTimeout(function () {
         audioWin.play();
         wins++;
         alert("CONGRATULATIONS! YOU ARE A WINNER!");
         document.getElementById("wins").innerHTML = ("WINS: " + wins);
         startGame();
      }, 200);
   }
   //when the user runs out of lives by guessing incorrectly too many times, they are alerted "game over" and 
   //a loss is added to the loss column, the game also restarts here
   else if (lives === 0) {
      setTimeout(function () {
         audioLose.play();
         losses++;
         alert("GAME OVER");
         document.getElementById("losses").innerHTML = ("LOSSES: " + losses);
         startGame();
      }, 200);
   };
}
   //starts the game by running the startGame function
   startGame();

   //run this when a user presses a key
   document.onkeyup = function (event) {

      //determines what key was pressed, turns it into an array...also makes key strokes lowercase
      userGuess = String.fromCharCode(event.which).toLowerCase();
      console.log(userGuess);

      //runs the checkGuess function on key press
      checkGuess(userGuess);

      //runs the roundcomplete function
      roundFinish();
   }

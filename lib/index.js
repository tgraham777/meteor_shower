const Runner = require('./runner');

var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');
var gameSize = { x: canvas.width, y: canvas.height };

var runner = new Runner(canvas, context, gameSize);
runner.addPlayer();
var interval = runner.addMeteors(1000);
runner.playStartGameSound();

function gameLoop(){
  if(!runner.isGameOver()) {
    var oldScore = runner.score.results().totalScore;
    runner.draw();
    runner.playScoreSound(oldScore);
    requestAnimationFrame(gameLoop)
  } else {
    clearInterval(interval);
    runner.playGameOverSound();
    gameOverLoop();
  }
}

function gameOverLoop() {
  clearScreen();

  context.font="40px Verdana";
  context.fillStyle = "red";
  context.fillText("Game Over!", 105, 100);

  context.fillStyle = "green";
  context.fillText("Play Again?", 105, 320);

  restartOption();
}

function clearScreen() {
  $(function() {
    context.clearRect(0, 0, gameSize.x, gameSize.y);
    $("#screen").css("background-image", "url('../images/background/homework.png')");
    $("#screen").css("background-size", "325px 400px");
  });
}

function restartOption() {
  $(function() {
    $("#screen").click(function() {
      $("#screen").css("background-image", "url('../images/background/turing-logo2.jpg')");
      $("#screen").css("background-size", "250px 250px");
      runner = new Runner(canvas, context, gameSize);
      runner.playStartGameSound();
      runner.clearObjects();
      runner.addPlayer();
      interval = runner.addMeteors(1000);
      gameLoop();
    });
  });
}

gameLoop();

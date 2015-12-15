const Runner = require('./runner');

var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');
var gameSize = { x: canvas.width, y: canvas.height };

var runner = new Runner(canvas, context, gameSize);
runner.addPlayer();
runner.addMeteors(1000);

function gameLoop(){
  if(!runner.isGameOver()) {
    runner.draw();
    requestAnimationFrame(gameLoop)
  } else {
    runner.endGameDisplay();
  }
}

gameLoop();

const Board = require('./board');

var Runner = function(canvas, context, gameSize) {
  this.canvas   = canvas;
  this.context  = context;
  this.gameSize = gameSize;
  this.board = new Board(canvas.width, canvas.height);
};

Runner.prototype.addPlayer = function() {
  this.board.addPlayer();
}

Runner.prototype.isGameOver = function() {
  return this.board.players.length < 1
}
Runner.prototype.draw = function(){
  this.displayScores();
  this.update(this.board);
  this.drawObjects(this.context, this.gameSize, this.board);
  this.board.removeInActiveObjects();
}

Runner.prototype.displayScores = function() {
  var results = this.board.results();
  document.getElementById('score').innerHTML = "Score: " + results.score;
  document.getElementById('meteors-destroyed').innerHTML = "Meteors Destroyed: "
   + results.meteorsDestroyed;
}

Runner.prototype.endGameDisplay = function() {
  var results = this.board.results();
  window.alert("Game over! Your score was " + results.score + "." +
  " You destroyed " + results.meteorsDestroyed + " meteors.");
}

Runner.prototype.addMeteors = function(interval) {
  window.setInterval(function() {
    this.board.addMeteor();
  }.bind(this), interval);
}

Runner.prototype.drawObjects = function(context, gameSize, board) {
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  for (var i = 0; i < board.joinObjects().length; i++) {
     drawRect(context, board.joinObjects()[i]);
  }
};

Runner.prototype.update = function(board) {
  for (var i = 0; i < board.joinObjects().length; i++) {
    board.joinObjects()[i].update();
  }
};

var drawRect = function(context, body) {
  context.fillRect(body.center.x - body.size.width / 2,
                  body.center.y - body.size.height / 2,
                  body.size.width, body.size.height);
};

module.exports = Runner;

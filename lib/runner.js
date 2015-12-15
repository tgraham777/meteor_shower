const Board = require('./board');

var Runner = function(canvas, context, gameSize) {
  this.canvas   = canvas;
  this.context  = context;
  this.gameSize = gameSize;
  this.board = new Board(canvas.width, canvas.height);
  
  var self = this;
  this.board.addPlayer();

  var gameLoop = function() {
    self.displayScores();
    if(self.board.players.length >= 1) {
      self.update(self.board);
      self.draw(self.context, self.gameSize, self.board);
      self.board.removeInActiveObjects();
      requestAnimationFrame(gameLoop);
    } else {
        self.endGameDisplay();
    }
  };

  gameLoop();
};

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
  // var board = this.board
  window.setInterval(function() {
    this.board.addMeteor();
  }.bind(this), interval);
}

Runner.prototype.draw = function(context, gameSize, board) {
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

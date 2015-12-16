const Board = require('./board');
const Score = require('./score');

var Runner = function(canvas, context, gameSize) {
  this.canvas    = canvas;
  this.context   = context;
  this.gameSize  = gameSize;
  this.board     = new Board(canvas.width, canvas.height);
  this.score     = new Score(this.board);
  this.startTime = Date.now();
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
  var results = this.score.results();
  var time = this.calculateTime();
  document.getElementById('level').innerHTML = this.score.determineLevel();
  document.getElementById('time').innerHTML = time.minutes + " mins, " + time.seconds + " secs";
  document.getElementById('meteors-destroyed').innerHTML = results.meteorsDestroyed;
  document.getElementById('score').innerHTML = results.totalScore;
}

Runner.prototype.calculateTime = function() {
  var timeSecs = Math.floor((Date.now() - this.startTime) / 1000);
  var minutes = Math.floor(timeSecs / 60);
  var seconds = timeSecs - (minutes * 60);
  return {
    minutes: minutes,
    seconds: seconds
  }
}


Runner.prototype.endGameDisplay = function() {
  var results = this.score.results();
  window.alert("Game Over! \nYour score was " + results.totalScore + "." +
  " You reached level " + this.score.determineLevel() +
  " and destroyed " + results.meteorsDestroyed +
  " meteors in a total time of " + this.calculateTime().minutes + " mins and " + this.calculateTime().seconds + " seconds.");
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

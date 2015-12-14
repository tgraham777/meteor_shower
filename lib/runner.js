const Board = require('./board');
const Meteor = require('./meteor');


var Runner = function() {
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height };

  var board = new Board(canvas.width, canvas.height);
  var self = this;
  board.addPlayer();

  var intervalId = window.setInterval(function() {
    board.addMeteor();
  }, 1000);

  var gameLoop = function() {
    if(board.players.length >= 1) {
      self.update(board);
      self.draw(context, gameSize, board);
      board.removeInActiveObjects();
      requestAnimationFrame(gameLoop);
    } else {
      window.alert("Game over!");
    }
  };

  gameLoop();
};

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

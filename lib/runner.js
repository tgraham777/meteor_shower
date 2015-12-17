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

var staffMeteors = [
  'allison.png', 'carmer.png', 'dao.png', 'horace.png', 'jeff.png',
  'joanne.png', 'jorge.png', 'josh.png', 'lovisa.png', 'marissa.png',
  'meeka.png', 'mejia.png', 'rachel.png', 'steve.png', 'tess.png'
]

//Meteors
var meteorImage = new Image();
var meteorSrc = _.sample(staffMeteors);
meteorImage.src = './images/staff/' + meteorSrc;

window.setInterval(function() {
  var meteorSrc = _.sample(staffMeteors);
  meteorImage.src = './images/staff/' + meteorSrc;
}, 10000);

//Player
var studentPlayers = [
  'alon.png', 'bret.png', 'chris.png', 'george.png', 'hecker.png',
  'holzmann.png', 'jeff.png', 'matt.png', 'mb.png', 'mimi.png', 'rose.png',
  'russell.png', 'ryan.png', 'travis.png'
]

var playerImage = new Image();
var playerSrc = _.sample(studentPlayers);
playerImage.src = './images/students/' + playerSrc;

//Bullet
var bulletImage = new Image();
bulletImage.src = './images/bullet/ruby.png';

Runner.prototype.addPlayer = function() {
  this.board.addPlayer();
}

Runner.prototype.isGameOver = function() {
  return this.board.players.length < 1
}

Runner.prototype.clearObjects = function() {
  this.board = new Board(this.canvas.width, this.canvas.height);
  this.score = new Score(this.board);
  this.startTime = Date.now();
  // debugger;
  // clearInterval(this.interval);
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

// Runner.prototype.endGameDisplay = function() {
//   var results = this.score.results();
//   window.alert("Game Over!\n\nYour score was " + results.totalScore + "." +
//   " You reached Level " + this.score.determineLevel() +
//   " and conquered " + results.meteorsDestroyed +
//   " assessments in a total time of " + this.calculateTime().minutes +
//   " mins and " + this.calculateTime().seconds + " seconds.\n");
// }

Runner.prototype.addMeteors = function(interval) {
  if(this.interval) {
    clearInterval(this.interval);
  }
  return this.interval = window.setInterval(function() {
    this.board.addMeteor(this.score.determineLevel());
    // debugger;
  }.bind(this), interval);
}

Runner.prototype.drawObjects = function(context, gameSize, board) {
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  var objects = board.joinObjects();
  for (var i = 0; i < objects.length; i++) {
    if(objects[i].constructor.name === 'Meteor') {
      drawObject(meteorImage, context, objects[i]);
    } else if(objects[i].constructor.name === 'Player') {
      drawObject(playerImage, context, objects[i]);
    } else {
      drawObject(bulletImage, context, objects[i]);
    }
  }
};

Runner.prototype.update = function(board) {
  for (var i = 0; i < board.joinObjects().length; i++) {
    board.joinObjects()[i].update();
  }
};

var drawObject = function(image, context, body) {
  context.drawImage(image, body.center.x - body.size.width / 2,
                  body.center.y - body.size.height / 2,
                  body.size.width, body.size.height);
};

module.exports = Runner;

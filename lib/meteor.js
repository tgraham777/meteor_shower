function Meteor(board, level, xDim, yDim) {
  this.board = board;

  var randomXPosition = Math.floor(Math.random() * this.board.width);

  var randomWidth = Math.floor(Math.random() * 40) + 25;
  var randomHeight = Math.floor(Math.random() * 40) + 25;
  var randomWidth2 = Math.floor(Math.random() * 25) + 20;
  var randomHeight2 = Math.floor(Math.random() * 25) + 20;
  var randomWidth3 = Math.floor(Math.random() * 10) + 15;
  var randomHeight3 = Math.floor(Math.random() * 10) + 15;

  var yVelocity = Math.floor(Math.random() * 3) + 1;
  var xVelocity = Math.floor(Math.random() * 3) - Math.floor(Math.random() * 3);
  var yVelocity2 = Math.floor(Math.random() * 3) + 2;
  var yVelocity3 = Math.floor(Math.random() * 3) + 4;

  if (level < 2) {
    this.size = { width: xDim || randomWidth, height: yDim || randomHeight};
  } else if (level < 4) {
    this.size = { width: randomWidth2, height: randomHeight2};
  } else {
    this.size = { width: randomWidth3, height: randomHeight3};
  }

  this.pointValue = Math.floor(-((this.size.width + this.size.height) / 2) + 66);
  this.center = { x: randomXPosition, y: 0 - (this.size.height / 2) };

  if (level < 2) {
    this.velocity = { x: xVelocity, y: yVelocity };
  } else if (level < 4) {
    this.velocity = { x: xVelocity, y: yVelocity2 };
  } else {
    this.velocity = { x: xVelocity, y: yVelocity3 };
  }

  this.active = true;
  this.board.meteors.push(this);
}

Meteor.prototype.update = function() {
  this.center.y += this.velocity.y;
  this.center.x += this.velocity.x;
}

module.exports = Meteor;

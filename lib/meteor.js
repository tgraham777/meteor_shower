function Meteor(board) {
  this.board = board;

  var randomXPosition = Math.floor(Math.random() * this.board.width);
  var randomWidth = Math.floor(Math.random() * 25) + 16;
  var randomHeight = Math.floor(Math.random() * 25) + 16;
  var yVelocity = Math.floor(Math.random() * 3) + 1;
  var xVelocity = Math.floor(Math.random() * 3) - Math.floor(Math.random() * 3);

  this.size = { width: randomWidth, height: randomHeight};
  this.pointValue = Math.floor(-((this.size.width + this.size.height) / 2) + 42);
  this.center = { x: randomXPosition, y: 0 - (this.size.height / 2) };
  this.velocity = { x: xVelocity, y: yVelocity };
  this.active = true;
  this.board.meteors.push(this);
}

Meteor.prototype.update = function() {
  this.center.y += this.velocity.y;
  this.center.x += this.velocity.x;
}

module.exports = Meteor;

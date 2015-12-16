const Keyboarder = require('./keyboarder');

function Player(board) {
  this.board = board;
  this.center = { x: this.board.width / 2, y: this.board.height - 10 };
  this.size = { width: 50, height: 50 };
  this.velocity = { left: -7, right: 7 };
  this.keyboarder = new Keyboarder();
  this.rateOfFireCounter = 0;
  this.rateOfFireValue = 15;
  this.active = true;
  this.board.players.push(this);
}

Player.prototype.update = function() {
  this.checkLeftRight();
  this.checkShotFired();
}

Player.prototype.checkLeftRight = function() {
  var leftEdge = this.center.x - (this.size.width / 2);
  var rightEdge = this.center.x + (this.size.width / 2);

  this.checkLeftEdge(leftEdge);
  this.checkRightEdge(rightEdge);

  if (leftEdge > 0 && rightEdge < this.board.width) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += this.velocity.right;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x += this.velocity.left;
    }
  }
}

Player.prototype.checkLeftEdge = function(leftEdge) {
  if (leftEdge <= 0) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += this.velocity.right;
    }
  }
}

Player.prototype.checkRightEdge = function(rightEdge) {
  if (rightEdge >= this.board.width) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x += this.velocity.left;
    }
  }
}

Player.prototype.checkShotFired = function() {
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    if (this.rateOfFireCounter % this.rateOfFireValue === 0) {
      var bullet = this.board.addBullet();
    }
    this.rateOfFireCounter++;
  }
}

module.exports = Player;
